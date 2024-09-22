// const User = require("../models/user_models.js");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const login = async(req, res)=>{
//     try{
//         const {email,password,role} = req.body;
//         if( !email || !password || !role){
//             return res.status(400).json({
//                 message:"Something missing login",
//                 success:false
//             });
//         }
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(400).json({
//                 message:"Incorrect email or password.",
//                 success:false,
//             })
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if(!isPasswordMatch){
//             return res.status(400).json({
//                 message:"Incorrect email or password.",
//                 success: false,
//             })
//         };
//         // Check role is correct or not
//         if(role != user.role){
//             return res.status(400).json({
//                 message:"Account does not exists with current role",
//                 success:false
//             })
//         };
//         const tokenData ={
//             userId: user._id
//         }
//         const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn: 'id'});
        
//         user = {
//             _id:user._id,
//             fullname:user.fullname,
//             email:user.email,
//             phoneNumber: user.phoneNumber,
//             role:user.role,
//             profile:user.profile
//         }



//         return res.status(200).cookie("token", token , {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite: 'strict'}).json({
//             message:`Welcome back ${user.fullname}`,
//             user,
//             success:true
//         })

//     }catch(error){

//     }
// }

// module.exports = login;


const {User} = require("../../models/user_models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: getDataUri } = require("../../uttils/datauri.js");
const cloudinary = require("../../uttils/cloudinary.js")

const login = async(req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = login;
