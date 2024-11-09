import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import ConnectDb from "./Models/db.js"
import ProductRoute from "./Routes/ProductsRoutes.js"
import ConsumerRoute from './Routes/ConsumerRoutes.js'
import cloudinary from 'cloudinary'

dotenv.config();

const app = express()

ConnectDb(); 
app.use(cors())
app.use(express.json())


cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_API_SECRET,
})


app.get("/",(req,res) =>{
    res.status(200).json({
        sucess:true,
        message:"Sucessfully Created"
    })
})

app.use("/api",ProductRoute);
app.use('/consumer',ConsumerRoute);

const PORT=process.env.PORT || 3001;

app.listen(PORT,() =>{
    console.log(`Started ${PORT}`)
})

