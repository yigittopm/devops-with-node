const router = require("express").Router();
const {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
  updatePost,
} = require("../controllers/post.controller");

// localhost:3000/
router.route("/").get(getAllPosts).post(createPost);

// localhost:3000/:id
router.route("/:id").get(getOnePost).patch(updatePost).delete(deletePost);

module.exports = router;
