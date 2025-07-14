const express = require('express');
const userController = require('../Controllers/UserController');
const projectController = require("../Controllers/projectController")
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/multerMiddlewareConfig')

const router = express.Router();

// user
router.post("/login",userController.UserLogin)
router.post("/register",userController.UserRegister)
// project
router.post("/addproject",jwtMiddleware,multerMiddleware.single('image'), projectController.addProject)
router.get("/allprojects",jwtMiddleware, projectController.allProjects)
router.get("/userprojects",jwtMiddleware, projectController.userProjects)
router.get("/getproject/:id",jwtMiddleware, projectController.getProjectById)
router.delete("/deleteproject/:id",jwtMiddleware, projectController.deleteProject)
router.put("/updateproject/:id",jwtMiddleware,multerMiddleware.single('image'), projectController.updateProject)

module.exports = router;