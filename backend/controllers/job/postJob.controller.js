// // const Job = require("../../models/jobs.models.js");

// // const postJob = async(req, res) =>{
// //     try{
// //         const {title, description, requirements, salary, location, jobType, experience, position, companyId, expierenceLevel} = req.body;
// //         const userId = req.id;

// //         if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId || !created_by)
// //         {
// //             return res.status(400).json({
// //                 message:"Something is missing",
// //                 success:false
// //             });
// //         };

// //         // Assuming you want to create a new job posting
// //         const job = await Job.create({
// //             title,
// //             description,
// //             requirements: requirements.split(","),
// //             salary: Number(salary),
// //             location,
// //             jobType,
// //             experience: expierenceLevel,
// //             position,
// //             companyId,
// //             created_by: userId
// //         });

// //         return res.status(201).json({
// //             message: "Job created successfully",
// //             success: true,
// //             job
// //         });
// //     } catch(error){
// //         return res.status(500).json({
// //             message: "Server error",
// //             success: false
// //         });
// //     }
// // }

// // module.exports = postJob;
// const Job = require("../../models/jobs.models.js");

// const postJob = async(req, res) => {
//     try {
//         const { title, description, requirements, salary, location, jobType, expierenceLevel, position, companyId } = req.body;
//         const userId = req.id;

//         if (!title || !description || !requirements || !salary || !location || !jobType || !expierenceLevel || !position || !companyId|| !userId) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         };

//         // Create a new job posting
//         const job = await Job.create({
//             title,
//             description,
//             requirements: requirements.split(","),
//             salary: Number(salary),
//             location,
//             jobType,
//             experience: expierenceLevel,
//             position,
//             companyId,
//             created_by: userId
//         });

//         return res.status(201).json({
//             message: "Job created successfully",
//             success: true,
//             job
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Server error",
//             success: false
//         });
//     }
// }

// module.exports = postJob;
// import { Job } from "../models/job.model.js";

// admin post krega job

const Job = require("../../models/jobs.models.js");

const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = postJob;
