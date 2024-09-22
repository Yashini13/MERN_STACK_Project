const express = require("express")
const isAuthenticated = require("../middlewares/isAuthenticate.js")
const registerCompany = require("../controllers/company/registerCompany.controller.js");
const updateCompany = require("../controllers/company/updateCompany.controller.js");
const getCompany = require("../controllers/company/getCompany.controller.js")
const getCompanyById = require("../controllers/company/getCompanyByIdController.js")
const singleUpload = require("../middlewares/multer.js")

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated, getCompany)
router.route("/get/:id").get(isAuthenticated, getCompanyById)
// router.route("/profile/update").put(isAuthenticated,singleUpload, updateCompany) //change to update profile not logout
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany) //change to update profile not logout


module.exports = router;