// import db from '../db/index'

// function getValue(a:any)
// {
//     if(typeof a==="string")
//     {
//         return `'${a}'`;
//     }
//     return a;
// }

// class Model<T>{
//     tableName?:String;

//     constructor(tableName:String){
//         this.tableName=tableName;
//     }
//     insert(){
//         let tableName = this.tableName;
//         delete this.tableName;
//         let data = this;
//         const sql_query = `INSERT INTO ${tableName}(${Object.keys(data).join(',')}) VALUES (${Object.values(this).map(getValue).join(",")})`;
//         return db(sql_query);
//     }
//     update(query)
//     {

//         // return db()
//     }
//     find(){
//         const data =  this;
//     }
//     findAll<T>()
//     {
//         const sql_query = `Select * from ${this.tableName}`
//     }
// }

// export default Model;

import { FieldPacket, QueryResult,ResultSetHeader,RowDataPacket } from 'mysql2';

export default interface Model<T>{

    insert(data:any): Promise<[ResultSetHeader, FieldPacket[]]>;
    find?(findQuery:string): Promise<[RowDataPacket[], FieldPacket[]]>;
    findAll?(): Promise<[RowDataPacket[], FieldPacket[]]>;
    update?(dbQuery:String,updateQuery:String): Promise<[ResultSetHeader, FieldPacket[]]>;
    delete?(deletQuery:String): Promise<[ResultSetHeader, FieldPacket[]]>;

}