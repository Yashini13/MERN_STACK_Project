const {Company} = require("../../models/comapny.models");

const getCompanyById = async(req, res) =>{
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(200).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}
module.exports = getCompanyById;