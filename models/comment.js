const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
