const Job = require("../../models/jobs.models.js");

const getJobById = async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findByI(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
module.exports = getJobById;