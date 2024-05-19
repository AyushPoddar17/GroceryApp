import { Request, Response } from 'express';
import User from "../models/user";
import Order from "../models/order";
import Grocery, { GroceryType } from '../models/grocery';
import OrderDetail from '../models/orderDetail';

export const insertUser = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        const [result, fields] = await new User().insert(data);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({ message: 'unsucessful', error: error.message });
    }

}

export const viewGroceryItems = async (req: Request, res: Response) => {
    try {
        const grocery = new Grocery();
        let location = req.params['location'];
        const [result, fields] = await grocery.find(`location="${location}"`);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({ message: 'unsucessful', error: error.message });
    }
}

export const placeOrder = async (req: Request, res: Response) => {
    try {
        let user_id = parseInt(req.body.jwtDecode?.id);
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let list = req.body.list;
        let [orderResult, orderFields] = await new Order().insert({ customerID: user_id, orderDate: date });
        // let items = req.body.list.map((item:GroceryType) => ({ ...item, orderID: orderResult.insertId }));
        let orderDetailsResult = [];
        for (let i = 0; i < list.length; i++) {
            let item = { ...list[i], orderID: orderResult.insertId };
            const [orderDetailResult, orderDetailFiels] = await new OrderDetail().insert(item)
            console.log(orderDetailResult);
            
            if (orderDetailResult.affectedRows === 0) {
                orderDetailsResult.push({
                    productID: item.productID,
                    message: "Out of Stock"
                });
            } else {
                orderDetailsResult.push({
                    productID: item.productID,
                    message: "Sucessfully Placed"
                });

            }
        }
        res.json(orderDetailsResult);

        // res.json(orderDetailsResult);

    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({ message: 'unsucessful', error: error.message });
    }
}