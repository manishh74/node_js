const user = require("../model/userModel");

const createUser = async (req, res) => {
  const { companyName, companyEmail, contactNumber } = req.body;
  try {
    await user.create(companyName, companyEmail, contactNumber);
    res.status(200).json({
      success: true,
      error: false,
      message: "user created successfully",
    });
  } catch (err) {
    console.error("error executing query:" + err.stack);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const results = await user.getAll();
    res.status(200).json({
      success: true,
      error: false,
      data: results[0],
      message: "data fetched successfully!!",
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};

const getUsersByid = async (req, res) => {
  try {
    const userId = req.body.id;
    if (!userId) {
      return res.status(400).json({
        success: true,
        error: false,
        message: "User ID is required",
      });
    }
    const results = await user.getByid(userId);

    if (results.length === 0 || results[0].length === 0) {
      return res.status(404).json({
        success: true,
        error: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "user detail fetched sucessfully!!",
      data: results[0][0],
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
      data: null,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({
        success: true,
        error: false,
        message: "User ID is required",
      });
    }
    const results = await user.deletedById(userId);
    if (results.affectedRows === 0) {
      res.status(404).json({
        success: true,
        error: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Successfully deleted",
      data: null,
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: true,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId, companyName, companyEmail, contactNumber } = req.body;

    if (!userId) {

      return res.status(400).json({
        success: true,
        error: false,
        message: "User ID is required",
      });
    }
    const results = await user.updatedById(
      userId,
      companyName,
      companyEmail,
      contactNumber
    );
    if (results.affectedRows === 0) {
      res
        .status(404)
        .json({ success: true, error: false, message: "User not found!!" });
      return;
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "data updated successfully",
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: true,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUsersByid,
  deleteUser,
  updateUser,
};
