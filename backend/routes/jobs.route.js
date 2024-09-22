const express = require("express")
const isAuthenticated = require("../middlewares/isAuthenticate.js");
const postJob = require("../controllers/job/postJob.controller.js");
const getAllJobs = require("../controllers/job/getAllJobs.controller.js");
const getAdminJobs = require("../controllers/job/getAdminJobs.controller.js");
const getJobById = require("../controllers/job/getJobById.constroller.js");

const router = express.Router();

router.route('/post').post(isAuthenticated, postJob);
router.route('/get').get(isAuthenticated, getAllJobs);
router.route('/getadminjobs').get(isAuthenticated, getAdminJobs);
router.route('/get/:id').get(isAuthenticated, getJobById);

module.exports = router;

