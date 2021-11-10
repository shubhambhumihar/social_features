const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // since we are going to link post with the user,we will just say type-> this type is a reference. so this post whatever the post is going to be created is going to be linked with the user.so it needs to refer to the user schema.so this field is of type of ObjectId,we are going to refere with this Objcetid it is always going to be unique  ,and we rae refering to User schema ie ref:"User"
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // whenevr we are loading a post then i need to findout all the comment inside that post,one way is to go to comment Schema and find out all the comments ,but we frequently need to require loading all comments with the post so one of way to fetching the commment fast is to include the ids of all the comments in the array.
    //! include the array of ids of all comments in this post schema itself
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

// !Concept -> Now crete schema  for post and then link it to users,whenver a post is posted then it has to come with a user which is loged in,So a  post needs to have a user in it and what would be the relationship between user and post -> well it is one to many,ie one user can make multiple post but a post cant be posted by the multiple uset user

// ?So how to establish a relationship in database?
