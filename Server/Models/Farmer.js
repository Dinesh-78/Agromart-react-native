import mongoose from "mongoose";

const FarmerSchema = new mongoose.Schema({
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
        

    },
    location:{
        type: String,
        required: true,
        
    }
});

export default mongoose.model('Farmer',FarmerSchema);


