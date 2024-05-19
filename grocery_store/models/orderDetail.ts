import { FieldPacket, QueryResult, ResultSetHeader } from "mysql2";
import getValue from "../libs/getValues";
import Model from "../libs/Model";
import db from '../db/index';

export type OrderDetailType = {
    orderID: Number,
    productID: Number,
    quantity: Number,
    price: Number,
    date:string
}


class OrderDetail implements Model<OrderDetail>{
    readonly tableName: String;
    orderID: Number;
    productID: Number;
    quantity: Number;
    price: Number;
    
    constructor() {
        this.tableName = 'orderDetails';
    }
    insert(data: OrderDetailType): Promise<[ResultSetHeader, FieldPacket[]]> {
        let query = `INSERT INTO ${this.tableName} (${Object.keys(data).join(',')}) SELECT ${Object.values(data).map(getValue).join(',')} FROM Grocery WHERE id=${data.productID} AND quantity > 0`;
        console.log(query);
        return db<ResultSetHeader>(query);

    }

}


export default OrderDetail