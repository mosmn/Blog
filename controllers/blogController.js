const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const Comment = require("../models/comment");

exports.getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

exports.createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: "Only admins can create posts" });
  }

  const post = new Post({ title, content, author: req.user._id });
  await post.save();
  res.status(201).json(post);
});

exports.updatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: "Only admins can update posts" });
  }

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true },
  );
  res.json(post);
});

exports.deletePost = asyncHandler(async (req, res) => {
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: "Only admins can delete posts" });
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

exports.likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likesCount += 1;
  await post.save();
  res.json(post);
});

exports.unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likesCount -= 1;
  await post.save();
  res.json(post);
});

exports.getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.id });
  res.json(comments);
});

exports.addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const comment = new Comment({
    content,
    author: req.user._id,
    post: req.params.id,
  });
  await comment.save();
  res.status(201).json(comment);
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);

  if (
    req.user._id.toString() !== comment.author.toString() &&
    req.user.type !== "admin"
  ) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this comment" });
  }

  await Comment.findByIdAndDelete(req.params.commentId);
  res.status(204).end();
});

exports.likeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  comment.likesCount += 1;
  await comment.save();
  res.json(comment);
});

exports.unlikeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  comment.likesCount -= 1;
  await comment.save();
  res.json(comment);
});
