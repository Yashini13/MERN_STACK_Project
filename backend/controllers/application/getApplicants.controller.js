const {Application} = require('../../models/application.models.js');
const {Job} = require('../../models/jobs.models.js')
// For admin to see how many users have applied
const mongoose = require('mongoose');
const getAppliedJobs = async (req,res) => {
        try {
            const userId = req.id;
            const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
                path:'job',
                options:{sort:{createdAt:-1}},
                populate:{
                    path:'company',
                    options:{sort:{createdAt:-1}},
                }
            });
            if(!application){
                return res.status(404).json({
                    message:"No Applications",
                    success:false
                })
            };
            return res.status(200).json({
                application,
                success:true
            })
        } catch (error) {
            console.log(error);
        }
}
module.exports = getAppliedJobs;



