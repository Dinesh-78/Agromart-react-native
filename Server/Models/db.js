import mongoose from "mongoose";
import createItem from '../controllers/Testingcon.js'
const ConnectDb = async () =>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log("CONNECTED")
    } catch (err){
       console.log(`Connection Error ${err}`)
    }
}

export default ConnectDb;