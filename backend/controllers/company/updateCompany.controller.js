const {Company} = require("../../models/comapny.models");
const getDataUri = require("../../uttils/datauri.js");
const cloudinary = require("../../uttils/cloudinary.js")
const updateCompany = async (req, res) =>{
    try{
        const {name, description, website, location } = req.body;

        const file = req.file;
        
        //clodinary ayega
        const fileUri = getDataUri(file);

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

        const logo = cloudResponse.secure_url;

        const updateData = {name, description, website, location, logo};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});
        if(!company){
            res.status(404).json({
                message:"company not found",
                success: false
            })
        }

        return res.status(200).json({
            message:"Company updates made",
            sucess:true
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "An error occurred",
            success: false,
            error: error.message
          });
    }
}

module.exports = updateCompany;