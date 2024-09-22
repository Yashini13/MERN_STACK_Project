const {Company} = require("../../models/comapny.models");

const getCompany = async (req, res) =>{
    try{
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}

module.exports = getCompany;