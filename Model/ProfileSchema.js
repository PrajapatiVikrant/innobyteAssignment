const mongoose = require('mongoose')
const Profile = new mongoose.Schema({
    
        name: { 
            type: String,
            required: true,
            unique: true
         },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        bio: { 
            type: String, 
            required: true 
        },
        socialLink:{
            linkedIn:{
                type:String,
                required:false,
            },
            Instagram:{
                type:String,
                required:false,
            },
            whatsApp:{
                type:String,
                required:false
            }
        },
        createdAt: { 
            type: Date, 
            default: 
            Date.now
         }
    
})
const ProfileSchema = mongoose.model('InnobyteProfile',Profile)
module.exports = ProfileSchema;