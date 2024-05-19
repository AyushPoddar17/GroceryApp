import express from 'express';
import {placeOrder,viewGroceryItems} from '../controllers/userController';
import adminAuthentication from '../libs/adminAuthentication';
const router = express.Router();

router.get('/viewGroceries/:location',adminAuthentication('viewGroceries'),viewGroceryItems);
router.post('/placeOrder',adminAuthentication('placeOrder'),placeOrder);


export default router;