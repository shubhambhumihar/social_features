const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      // when we submit the post after signed in then what happen was it found the from the req.user._id-> we are getting user._id from the request by help of passport.js.ie setAuthenticatedUser fn,and we just want to store the user id not whole user object.it is unique
      user: req.user._id,
    });

    req.flash("success", "Post Published");

    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    // before delete the post i should find the posts in the database
    let post = await Post.findById(req.params.id);
    //! here 1st we need to check is user who is deleting the post is user who have written the post -> here post.user is the id untill and unless we choose to prepopulate this according to post schema
    // ? .id means converting the object id into the string

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "Post and associated comments deleted");
      return res.redirect("back");
    } else {
      req.flash("error", "You cannot delete this post!");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);

    return res.redirect("back");
  }
};
