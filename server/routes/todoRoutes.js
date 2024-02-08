const express = require("express");
const authenticateUser = require("../middleware/auth");
const checkRolePermission = require("../middleware/permissions");
const {
  createTodo,
  editTodo,
  deleteTodo,
  viewTodo,
} = require("../controllers/todoController");

const router = express.Router();
router.post(
  "/create-todo",
  authenticateUser,
  checkRolePermission(["Employee"]),
  createTodo
);
router.put(
  "/edit-todo/:todoId",
  authenticateUser,
  checkRolePermission(["Manager"]),
  editTodo
);
router.delete(
  "/delete-todo/:todoId",
  authenticateUser,
  checkRolePermission(["Admin"]),
  deleteTodo
);
router.get("/view-todo", authenticateUser, viewTodo);

module.exports = router;
