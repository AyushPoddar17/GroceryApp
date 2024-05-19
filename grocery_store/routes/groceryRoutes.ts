import express from 'express';
import { deleteGrocery, getAllGroceries, getGrocery, insertGrocery, updateGrocery } from '../controllers/groceryController';
import authentication from '../libs/adminAuthentication'
const router = express.Router();

router.get('/list',authentication('findAll_grocery'),getAllGroceries);
router.post('/add',authentication('insert_grocery'),insertGrocery);
router.get('/find/:id',authentication('find_grocery'),getGrocery);
router.put('/update/:id',authentication('update_grocery'),updateGrocery);
router.delete('/delete/:id',authentication('delete_grocery'),deleteGrocery)



export default router;