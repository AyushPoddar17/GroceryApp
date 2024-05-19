import Model from '../libs/Model';
import db from '../db/index';
import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';
import getValue from '../libs/getValues';

enum Role {
    'user',
    'admin'
}

export type UserType = {
    name: String;
    email: String;
    password: String;
    role: Role;
}

class User implements Model<User>{
    readonly tableName: String;
    name: String;
    email: String;
    password: String;
    role: Role;

    constructor() {
        this.tableName = 'users';

    }
    insert(data: UserType) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role;
        let query = `INSERT into ${this.tableName} (${Object.keys(data).join(',')}) values (${Object.values(data).map(getValue).join(",")})`
        return db<ResultSetHeader>(query);
    }
    update(dbQuery: String, updateQuery: String): Promise<[ResultSetHeader, FieldPacket[]]> {
        let query = `UPDATE ${this.tableName} SET ${updateQuery} WHERE ${dbQuery}`;
        return db<ResultSetHeader>(query);
    }
    delete(deleteQuery: string): Promise<[ResultSetHeader, FieldPacket[]]> {
        const query = `DELETE FROM ${this} WHERE ${deleteQuery} LIMIT 1`;
        return db<ResultSetHeader>(query);
    }
    find(findQuery: string): Promise<[RowDataPacket[], FieldPacket[]]> {
        findQuery = `SELECT * FROM ${this.tableName} WHERE ${findQuery}`;

        return db<RowDataPacket[]>(findQuery);
    }
    findAll(): Promise<[RowDataPacket[], FieldPacket[]]> {
        let query = `SELECT * from ${this.tableName}`
        return db<RowDataPacket[]>(query);
    }
}
export default User;