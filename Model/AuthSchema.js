const mongoose = require('mongoose')
const Auth = new mongoose.Schema({
    
        name: { 
            type: String,
            required: true,
           
         },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: 
            Date.now
         }
    
})
const AuthSchema = mongoose.model('InnobyteAuth',Auth)
module.exports = AuthSchema;