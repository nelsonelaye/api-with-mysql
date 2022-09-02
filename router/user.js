const express = require("express");
const router = express.Router();

const {
  viewAllUsers,
  createUser,
  viewOneUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

router.route("/user").get(viewAllUsers).post(createUser);
router
  .route("/user/:userId")
  .get(viewOneUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
