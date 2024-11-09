import mongoose from "mongoose";

const Consumerdetails = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    phno:{
        type: String,
        unique: true,
        required: true,

    },
    password:{
        type: String,
        required: true,
        
    }
},{
    timestamps: true
});

export default mongoose.model('Consumer',Consumerdetails);


