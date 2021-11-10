const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});

    return res.render("home", {
      title: "Codial Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

// !how do i find all the posts-> Post.find() will return all the posts that

// !Also we need to find which user has posted this-> we will use populate concept from mongoose docs.

// * We will first find all the posts and then will tell to populate the user of each posts this is the query. this is where the syntax changes ,i need to call another function that is exec,earlier we are calling the callback fn along side the query but right now we are poulating something so we need to put that callback fn into some another part of the code that is known as exec we just shhifted this callback fn into this exec

// ? And here i need to only display the user name not the whole object
// console.log(req.cookies);
// res.cookie("user_id", 25);
// Post.find({}, function (err, posts) {
//   return res.render("home", {
//     title: "Codial Home",
//     posts: posts,
//   });
// });

// populate the user of each post
