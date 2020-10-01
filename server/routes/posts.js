const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const auth = require("../middleware/auth");

const Post = require("../model/Post");
const User = require("../model/User");
const Comment = require("../model/Comment");

//Get all post request
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error"); 
  }
});

//Get single post request
router.get("/:id", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id).populate('comment user');
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//New post request by user
router.post(
  "/new",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("body", "Text is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, body, tag, photo } = req.body;

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        title,
        body,
        tag,
        photo,
        user: req.user.id,
        completed: true
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

//Draft post request by user
router.post(
  "/draft",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("body", "Text is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, body, tag, photo } = req.body;

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        title,
        body,
        tag,
        photo,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

//edit post
router.put("/edit/:id", auth, async (req, res) => {
  try {
    const editPost = await Post.findByIdAndUpdate(req.params.id);

    const { title, body, tag, photo } = req.body;

    editPost.title = title;
    editPost.body = body;
    editPost.tag = tag;
    editPost.photo = photo;
    const savePost = await editPost.save();
    if (req.user.id === editPost.user.toString()) {
      res.json({ savePost, success: true, edited: true });
    } else {
      res.status(400).json({ msg: "Nah, you can't do that", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

//delete post
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const delPost = await Post.findById(req.params.id);

    if (!delPost) {
      return res.status(400).json({ msg: "Post not found" });
    }

    if (delPost.user.toString() === req.user.id) {
      await delPost.remove();
      res.json({ msg: "Post removed", success: true });
    } else {
      return res
        .status(401)
        .json({ msg: "User not authorized", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

//route for like and unlike post
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((item) => item.toString == req.user.id);

      await post.save();

      res.json({ msg: post.likes.length, success: true });
    } else {
      post.likes.unshift(req.user.id);

      await post.save();
      res.json({ msg: post.likes.length, success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

//comment route
router.put(
  "/comment/:id",
  [
    auth,
    [check("text", "Text is required").not().isEmpty()],
  ],
  async (req, res) => {
    try {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }

      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        fullname: user.fullname,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.push(newComment);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

//delete comment
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
     const post = await Post.findById(req.params.id);

     // Pull out comment
     const comment = post.comments.find(
       (comment) => comment.id === req.params.comment_id
     );
     // Make sure comment exists
     if (!comment) {
       return res.status(404).json({ msg: "Comment does not exist" });
     }
     // Check user
     if (comment.user.toString() !== req.user.id) {
       return res.status(401).json({ msg: "User not authorized" });
     }

     post.comments = post.comments.filter(
       ({ id }) => id !== req.params.comment_id
     );

     await post.save();

     return res.json(post.comments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});


//comment convo
router.put("/subcomment/:id/:comment_id", auth, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id)
    console.log(post)
    const comment = post.comments.find(comment => comment.id === req.params.comment_id)
    
      const newComment = {
      text: req.body.text,
      fullname: user.fullname,
      avatar: user.avatar,
      user: req.user.id,
      };
    comment.subcomments.unshift(newComment); 

    await post.save();

    res.json(comment.subcomments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;