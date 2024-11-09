import {addproduct, allproducts,categoryitems,cropcategories,deleteproduct,farmerdetails,getidproduct,loginFarmer, Productpic, registerfarmer, sortallproducts, UpdateProduct} from '../controllers/FarmerProfile.js'
import express from "express"
import { singleUpload } from '../middlewares/multer.js';
const router = express.Router();


router.get('/allfarmproducts',allproducts);
router.post('/auth',loginFarmer)
router.get('/farmerdetails',farmerdetails)
router.get('/getidproduct/:proid',getidproduct);
router.post('/farmproducts',addproduct);
router.put('/updatebyfarmer/:proid',UpdateProduct);
router.delete('/deletebyproduct/:proid',deleteproduct);
router.post('/farmregisterprofile',registerfarmer);
router.post('/productpic',singleUpload,Productpic);
router.get('/categories',cropcategories);
router.get('/categoryitems/:categoryid',categoryitems);
router.get('/sortproducts',sortallproducts);
export default router