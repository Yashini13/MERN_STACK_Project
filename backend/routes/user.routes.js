const express = require("express")
const register = require("../controllers/user/usercontroller2.js")
const login = require("../controllers/user/user.controller_login.js")
const logout = require("../controllers/user/user.controller.js")
const updateProfile = require("../controllers/user/user.controller.updateProfile.js")
const isAuthenticated = require("../middlewares/isAuthenticate.js")
const singleUpload = require("../middlewares/multer.js")
const router = express.Router()
router.route("/register").post(singleUpload, register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated,singleUpload, updateProfile) //change to update profile not logout

module.exports = router;

// check the login credential and route functionalities

