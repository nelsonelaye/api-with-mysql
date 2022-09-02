const mysql = require("mysql");
const bcrypt = require("bcrypt");

const mysqlConnection = require("../config/mysql");

const viewAllUsers = (req, res) => {
  try {
    const sql = "SELECT * FROM users";
    mysqlConnection.query(sql, (err, result) => {
      if (err) {
        return res.status(404).json({
          message: err.message,
        });
      } else {
        return res.status(200).json({
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const viewOneUser = (req, res) => {
  try {
    const id = req.params.userId;
    const sql = "SELECT * FROM users WHERE id= ";

    mysqlConnection.query(sql + mysql.escape(id), (err, result) => {
      if (err) {
        res.status(400).json({
          message: err.message,
        });
      } else {
        if (result.length === 0) {
          return res.status(404).json({
            message: "user not found",
          });
        }
        return res.status(200).json({
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullname, age, email, password } = req.body;

    const salt = await bcrypt.genSalt(15);
    const hashed = bcrypt.hash(password, salt);

    const sql =
      "INSERT IGNORE INTO users(fullname, age, email, password) VALUES ?";

    const values = [[fullname, age, email, hashed]];

    mysqlConnection.query(sql, [values], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            message: "user with email already exist",
          });
        } else {
          return res.status(400).json({
            message: err.message,
          });
        }
      } else {
        res.status(201).json({
          message: "Created Successfully",
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = (req, res) => {
  try {
    const { fullname, age, email } = req.body;
    const id = req.params.userId;

    const sql = `UPDATE IGNORE users SET fullname=?, age=?, email=? WHERE id=? `;
    mysqlConnection.query(sql, [fullname, age, email, id], (err, result) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      } else {
        if (result.affectedRows == 0) {
          return res.status(404).json({
            message: "user not found",
          });
        }

        return res.status(200).json({
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = (req, res) => {
  try {
    const id = req.params.userId;

    const sql = "DELETE FROM users WHERE id= ";

    mysqlConnection.query(sql + mysql.escape(id), (err, result) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      } else {
        if (result.affectedRows == 0) {
          return res.status(404).json({ message: "user not found" });
        }

        return res.status(204).json({
          message: "User Deleted successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  viewAllUsers,
  createUser,
  viewOneUser,
  deleteUser,
  updateUser,
};
