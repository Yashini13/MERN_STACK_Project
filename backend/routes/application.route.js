const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticate.js");
const applyJob = require("../controllers/application/applyJob.controller.js");
const getAppliedJobs = require("../controllers/application/getApplicants.controller.js");
const updateStatus = require("../controllers/application/updateStatus.controller.js");
const newApplication = require("../controllers/application/newApplicant.controller.js")
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,newApplication);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

module.exports = router;