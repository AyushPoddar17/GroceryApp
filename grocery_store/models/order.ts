import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import Model from "../libs/Model";
import db from '../db/index';
import getValue from "../libs/getValues";


export type OrderType = {
    orderID?: Number,
    customerID: Number,
    orderDate: String,
}

class Order implements Model<Order>{
    readonly tableName: String;
    orderID: Number;
    customerID: Number;
    orderDate: String;

    constructor() {
        this.tableName = 'orders';
    }
    insert(data: OrderType): Promise<[ResultSetHeader, FieldPacket[]]> {
        let query = `INSERT INTO ${this.tableName} (${Object.keys(data).join(',')}) values (${Object.values(data).map(getValue).join(",")})`;
        return db<ResultSetHeader>(query);
    }

}

export default Order;