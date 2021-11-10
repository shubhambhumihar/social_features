const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // comment belongs  to a user so refer this with user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // comment belongs  to post so refer this with post
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

// !There can be a user and user can have the multiple posts -> and each posts acn have multiple comments. Now how do i store this in my JSON databae .very esy-> Inside the Schema of posts what we will do is we will reference to the user that is which user has posted this now in case of comment Schema there would be 2 Refernces first one is of user and second one will be of post that is on which post this comment has happen ,also a comment can be made on a comment but thatt is other kind of relationship ,we will look this later
