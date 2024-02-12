const express = require("express");
const router = express.Router();
const passport = require("passport");

const blogController = require("../controllers/blogController");

router.get("/posts", blogController.getAllPosts);

router.get("/posts/:id", blogController.getPost);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  blogController.createPost,
);

router.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  blogController.updatePost,
);

router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  blogController.deletePost,
);

router.patch(
  "/posts/:id/like",
  passport.authenticate("jwt", { session: false }),
  blogController.likePost,
);

router.patch(
  "/posts/:id/unlike",
  passport.authenticate("jwt", { session: false }),
  blogController.unlikePost,
);

router.get("/posts/:id/comments", blogController.getComments);

router.post(
  "/posts/:id/comments",
  passport.authenticate("jwt", { session: false }),
  blogController.addComment,
);

router.delete(
  "/posts/:id/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  blogController.deleteComment,
);

router.patch(
  "/comments/:id/like",
  passport.authenticate("jwt", { session: false }),
  blogController.likeComment,
);

router.patch(
  "/comments/:id/unlike",
  passport.authenticate("jwt", { session: false }),
  blogController.unlikeComment,
);

module.exports = router;
