
const {User} = require("../../models/user_models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDataUri = require("../../uttils/datauri.js");
const cloudinary = require("../../uttils/cloudinary.js")


const updateProfile = async (req, res) => {

    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const file = req.file; // Placeholder for file upload handling
         // cloudinary
        const fileUri = getDataUri(file);    // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);  // Check for missing fields (optional but recommended)
       

        if (!fullname && !email && !phoneNumber && !bio && !skills) {
            return res.status(400).json({
                message: "No data provided for update",
                success: false
            });
        }
        
        // Convert skills from string to array
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update user data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email; // Handle email update securely
        if (phoneNumber) user.phoneNumber = phoneNumber;
        
        // Ensure user.profile exists before updating bio or skills
        if (!user.profile) {
            user.profile = {};
        }
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        
        // Handle file upload logic here (if needed)
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

        await user.save();

        // Prepare updated user data for response
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
            success: true
        });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = updateProfile;
