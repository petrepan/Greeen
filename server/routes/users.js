const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = require("../model/User");

//register new user
router.post(
  "/register",
  [
    check("fullname", "Please Enter a Valid name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must be more than four characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { fullname, email, password } = req.body;

    //create an avatar with first letter from fullname
    let trimName = fullname.trim().toUpperCase()[0];
    let avatar = `<p style="color:#fff; font-weight:bolder;">${trimName}</p>`;

    //validate
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Please enter all fields" }] });
    }

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }

      const salt = await bcrypt.genSalt(10);

      const hashPassword = await bcrypt.hash(password, salt);

      const token = jwt.sign(
        { fullname, email, hashPassword },
        process.env.JWT_SECRET,
        {
          expiresIn: "20m",
        }
      );

      console.log(token);

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Account activation link",
        html: `
                <h1 style="color:#fff; background-color:green; text-align:center;">Greeen</h1>
                <h1>Please the link to activate your account</h1>
               <a href="${process.env.CLIENT_URL}/user/activate/${token}">Verify Your Account</a>
            `,
      };

      const sendEmail = await sgMail.send(emailData);

      res.json({
        token,
        success: true,
        msg: `Email has been sent to ${email}`,
      });
    } catch (error) { 
      console.log(error);
      res.status(500).json({ msg: "Error in Saving" });
    }
  }
);

router.post("/activation", async (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("activation error");
        return res.status(400).json({
          errors: [
            {
              msg: "Expired link, Signup again",
            },
          ],
        });
      } else {
        const { fullname, email, hashPassword } = jwt.decode(token);
        //create an avatar with first letter from fullname
        let avatar = fullname.trim().toUpperCase()[0];

        const user = new User({
          fullname,
          email, 
          password: hashPassword,
          avatar,
        });

        user.save((err, user) => {
          if (err) {
            console.log(err);
            return res
              .status(400)
              .json({ errors: [{ msg: "Error saving user" }] });
          } else {
            return res.json({
              token,
              user,
              success: true,
              msg: "Account Activation successful",
            });
          }
        });
      }
    });
  }
});

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    //validate
    if (!email || !password) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Please enter all fields" }] });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User does not exist" }] });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect Credentials!" }] });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 24000,
      });

      if (!token) throw Error("Couldnt sign the token");

      res.status(200).json({
        success: true,
        msg: "Login Successful",
        token,
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server Error" });
    } 
  }
);

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.send({ msg: "Error in Fetching user" });
  }
});

module.exports = router;
