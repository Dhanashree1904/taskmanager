
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Task from "../models/task.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const resp = await User.findById(decodedToken.userId).select(
        "isAdmin email"
      );

      /*if (!user) {
        return res.status(401).json({
          status: false,
          message: "Not authorized. User not found.",
        });
      }*/

      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: decodedToken.userId,
      };

      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ status: false, message: "Not authorized. Try login again." });
  }
};  

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

{/*const canCreateSubtask = async (req, res, next) => {   //changes
  try {
    const { userId, isAdmin } = req.user;
    const { taskId } = req.body; // Parent task ID from request.

    const parentTask = await Task.findById(taskId).select("owner team");

    if (!parentTask) {
      return res
        .status(404)
        .json({ status: false, message: "Parent task not found." });
    }

    const isAuthorized =
      isAdmin ||
      parentTask.owner.toString() === userId ||
      parentTask.team.includes(userId);

    if (isAuthorized) {
      next();
    } else {
      return res.status(403).json({
        status: false,
        message: "Not authorized to create a subtask for this task.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};*/}

export { isAdminRoute, protectRoute };
