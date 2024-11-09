import mongoose from 'mongoose';
import Counter from './Counter.js';
const CropProduct = new mongoose.Schema({
    proid:{
      type:String,
      unique: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    phno:{
        type: String,
        required: true,
        trim: true
    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Items',
        required: true
    },  
    location:{
        type: String,
        required: true,
        trim: true
        
    },
    quantity:{
      type: Number,
      required:true,
      min:[1,'qunatity shold not less than 1']
    },
    price:{
        type:Number,
        required: true,
        min: [0, 'Price cannot be less than 0']
    }},{
        timestamps: true
    }

);

CropProduct.pre('save',async function(next){
    const product = this;

    // If the product already has a proid, skip
    if (product.proid) return next();

    try {
       
        const namePrefix = product.name.slice(0, 2).toUpperCase();

       
        const counter = await Counter.findOneAndUpdate(
            { id: namePrefix },  // Filter by the name prefix
            { $inc: { seq: 1 } }, // Increment the sequence by 1
            { new: true, upsert: true }  // Create new counter if it doesn't exist
        );

        
        product.proid = `${namePrefix}${counter.seq}`;

        next();
    } catch (err) {
        return next(err);
    }
});


export default mongoose.model('cropproduct',CropProduct);


