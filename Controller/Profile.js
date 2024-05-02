const profileSchema= require('../Model/ProfileSchema')
require('../Config/db');
const Profile = {
    //display profile logic
    displayProfile:async(req,res)=>{
        const {email} = req.user;
        //contain all api login in tryCatch block to handle error
        try {

            const data = await profileSchema.findOne({email:email});
            if(data){
                res.status(200).json({
                    message:"ok",
                    data:data
                })
            }else{
                res.status(404).json({
                    message:"Profile not found"
                })
            }
        } catch (error) {
            res.status(502).json({
                message:"server error",
                error:error
            })
        }
    },
    createProfile:async(req,res)=>{
        const {name,email,bio,linkedIn,Instagram,whatsApp} = req.query
          //contain all api login in tryCatch block to handle error
       try {
         const data = new profileSchema({
            name:name,
            email:email,
            bio:bio,
            socialLink:{
                linkedIn:linkedIn,
                Instagram:Instagram,
                whatsApp:whatsApp

            }

         });
         await data.save();
         res.status(201).json({
            message:"Profile created",
         })
       } catch (error) {
        res.status(502).json({
            message:"server error"
        })
        
       }
    },
    editProfile:async(req,res)=>{
        const {name,email,bio,linkedIn,Instagram,whatsApp} = req.query
        //contain all api login in tryCatch block to handle error
        try {
             await profileSchema.updateOne({email:email},{name:name,email:email,bio:bio,socialLink:{linkedIn:linkedIn,Instagram:Instagram,whatsApp:whatsApp}});
             res.status(200).json({
                message:"Profile edited"
             })
         
        } catch (error) {
            res.status(502).json({
                message:"server error"
            })
         
        }
     },
}
module.exports = Profile;