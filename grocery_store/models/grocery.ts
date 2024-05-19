import Model from '../libs/Model';
import db from '../db/index';
import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';
import getValue from '../libs/getValues';

export interface GroceryType extends RowDataPacket{
    id?: Number;
    name: String;
    location: String;
    quantity: Number;
    price: Number;
    unit: String;
}

class Grocery implements Model<Grocery>{
    readonly tableName: String;
    id?: Number;
    name: String;
    location: String;
    quantity: Number;
    price: Number;
    unit: String;

    constructor() {
        this.tableName = 'Grocery';
    }
    insert(data: {name:string,quantity:Number,location:string,price:Number,unit:string}): Promise<[ResultSetHeader, FieldPacket[]]> {
        this.name = data.name;
        this.quantity = data.quantity;
        this.location = data.location;
        this.price = data.price;
        this.unit = data.unit;
        let query = `INSERT INTO ${this.tableName} (${Object.keys(data).join(',')}) values (${Object.values(data).map(getValue).join(",")})`;
        return db<ResultSetHeader>(query);
    }
    find(findQuery: string): Promise<[RowDataPacket[], FieldPacket[]]> {
        findQuery = `SELECT * FROM ${this.tableName} WHERE ${findQuery}`;
        console.log("findQuery:",findQuery);
        return db<RowDataPacket[]>(findQuery);

    }
    findAll(): Promise<[RowDataPacket[], FieldPacket[]]> {
        let query = `SELECT * from ${this.tableName}`;
        return db(query);

    }
    update(dbQuery: string, updateQuery: string): Promise<[ResultSetHeader, FieldPacket[]]> {
        let query = `UPDATE ${this.tableName} SET ${updateQuery} WHERE ${dbQuery}`;
        return db(query);
    }
    delete(deleteQuery: string): Promise<[ResultSetHeader, FieldPacket[]]> {
        const query = `DELETE FROM ${this} WHERE ${deleteQuery} LIMIT 1`;
        return db<ResultSetHeader>(query);
    }
}



export default Grocery;