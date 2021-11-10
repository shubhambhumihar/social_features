const Comment = require("../models/comment");
const Post = require("../models/post");
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      // push this commnet to the post
      post.comments.push(comment);
      post.save();

      res.redirect("/");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;

      comment.remove();

      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    } else {
      return re.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

// ? WE NEED TO create C0mment over the post so first i need to find whether the post exists and then only create the comments after it beacuse we need to create a comment and alot to the post and inside the post Schema we also need to add the coment id in the array inisde the post ,and inside the comment we need to add the Post id ,also inside the post we add the comment to that comment array both places so that we can make our query faster
