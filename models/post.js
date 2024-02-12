const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
});

postSchema.virtual("url").get(function () {
  return `/catalog/post/${this._id}`;
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
