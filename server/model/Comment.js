const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: [
    {
      text: String, 
      fullname: String,
      avatar: {
          type: String,
          default: false
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      ],
      subcomments: [
        {
          text: String,
          fullname: String,
          avatar: {
            type: String,
          },
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          likes: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
            },
          ],
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("comment", commentSchema);
