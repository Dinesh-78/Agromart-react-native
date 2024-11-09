import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true,
    },
    photo: {
        type: String,
    }
})

export default mongoose.model('Items',itemSchema);