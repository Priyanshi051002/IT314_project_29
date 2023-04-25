const express = require("express");
const {
  addpost,
  addComment,
  getPostsUser,
  removeLike,
  addLike,
  deletePost,
  getPostsHome,
  getPostsQuery,
} = require("../controllers/post.controller");
const router = express.Router();

router.post("/addPost", addpost);
router.post("/addComment", addComment);
router.post("/removeLike", removeLike);
router.post("/addLike", addLike);
router.delete("/deletePost", deletePost);
router.post("/getPostsUser", getPostsUser);
router.get("/getPostsHome", getPostsHome);
router.post("/getPostsQuery", getPostsQuery);

module.exports = router;
