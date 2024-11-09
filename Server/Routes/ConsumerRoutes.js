import express from "express"
import { getallitems, getcategories, getitems, loginConsumer, Registerconsumer } from "../controllers/ConsumerProfile.js";
const router = express.Router();

router.post('/registerconsumer',Registerconsumer);
router.post('/loginconsumer',loginConsumer);
router.get('/getitems/:categoryid',getitems);
router.get('/getcategories',getcategories);
router.get('/getallitems',getallitems);
export default router;