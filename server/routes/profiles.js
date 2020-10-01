const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const auth = require("../middleware/auth");
const normalize = require("normalize-url");

const Post = require("../model/Post");
const User = require("../model/User");
const Comment = require("../model/Comment");
const Profile = require("../model/Profile");

//Get single profile
router.get("/me", auth , async (req, res) => {
  try {
    const post = await Post.find({user: req.user.id})

    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user", ['fullname','email','avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json({profile,post});
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.find({ user: req.params.id });

    const profile = await Profile.findOne({ user: req.params.id })
      .populate("user", ["fullname", "email", "avatar"])

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json({ profile, post });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//New post request by user
router.post(
  "/",
  [auth, [check("bio", "Bio is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { bio, twitter, instagram, linkedin, facebook } = req.body;

    const user = await User.findById(req.user.id).select("-password");

    const userProfile = {
      user,
      bio, 
    };

    const socialFields = {
      twitter,
      instagram,
      linkedin,
      facebook,
    };

    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, {
          forceHttps: true,
        });
    }

    userProfile.social = socialFields;

    try {
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: userProfile },
        { new: true, upsert: true }
      );

      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

//delete profile
router.delete("/", auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    
    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ user: req.user.id });

    res.json({ msg: "User deleted" });
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;