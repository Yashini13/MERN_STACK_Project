const { User } = require("../../models/user_models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDataUri = require("../../uttils/datauri.js");
const cloudinary = require("../../uttils/cloudinary.js");

const register = async (req, res) =>{
    try{
        const { fullname, email, phoneNumber, password, role } = req.body;
        console.log(req.body);

        // Validate input fields
        if (!fullname || !email || !phoneNumber || !password || !role ) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        
        const file = req.file;
        console.log(file)
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    
        console.log(cloudResponse);
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        
        if(existingUser){
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        });
    }
}

module.exports = register;