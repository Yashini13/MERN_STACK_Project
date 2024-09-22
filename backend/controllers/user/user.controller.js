const {User} = require("../../models/user_models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const register = async (req, res) =>{
//     try{
//         const { fullname, email, phoneNumber, password, role } = req.body;
//         console.log(req.body);

//         // Validate input fields
//         if (!fullname || !email || !phoneNumber || !password || !role || 
//             fullname.trim() === "" || email.trim() === "" || phoneNumber.trim() === "" || password.trim() === "" || role.trim() === "") {
//             return res.status(400).json({
//                 message: "All fields are required",
//                 success: false
//             });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if(existingUser){
//             return res.status(400).json({
//                 message: "User already exists with this email.",
//                 success: false
//             });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         await User.create({
//             fullname,
//             email,
//             phoneNumber,
//             password: hashedPassword,
//             role,
//         });

//         return res.status(201).json({
//             message: "Account created successfully",
//             success: true
//         });
//     } catch(error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             success: false
//         });
//     }
// }

// module.exports = register;


// const login = async(req, res)=>{
//     try{
//         const {email,password, role} = req.body;
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



const logout = async(req, res) =>{
    try{
        return res.status(200).cookie("token","", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    }catch(error){
        console.log(error);
    }
}
module.exports = logout;



// const updateProfile = async(req, res) =>{
//     try{
//         const {fullname, email, phoneNumber, bio, skills} = req.body;
//         const file = req.file;
//         if( !fullname || !email || !phoneNumber || !bio || !skills){
//             return res.status(400).json({
//                 message:"Something missing in update profile",
//                 success:false
//             });
//         };
        
//         //converting skills which is string to array. 
//         //cloudarnay
//         let skillsArray
//         if(skills)
//         {
//             skillsArray = skills.split(",");

//         }
//         const userId = req.id;
//         let user = await User.findById(userId);
//         if(!user){
//             res.status(400).json({
//                 message:"User not found",
//                 success:false
//             })
//         }
//         //Updating data
//         if(fullname) user.fullname = fullname
//         if(email) user.email = email
//         if(phoneNumber)  user.phoneNumber = phoneNumber
//         if(bio) user.profile.bio = bio
//         if(skills) user.profile.skills = skillsArray
//         // resume comes later here

//         await user.save();
//         user = {
//             _id:user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).json({
//             message:"Profile updated successfully",
//             user,
//             success:true
//         });
//     }catch(error)
//         {
//             console.log(error);
//             return res.status(500).json({
//                 message: "Internal Server Error",
//                 success: false
//             });
//         }    
// }

// module.exports = updateProfile;