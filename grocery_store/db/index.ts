import mysql,{QueryResult, RowDataPacket} from 'mysql2/promise';


async function query<T extends QueryResult>(params){
  let connection: mysql.Connection;
  try {
    connection = await mysql.createConnection({
      host: 'db',
      user: 'root',
      database: 'grocery',
      port: 3306,
      password: 'strong_password',
    });
    return connection.query<T>(params);
  } catch (err) {
    console.log("Error Over here"+err);
    throw new Error(err);
  } finally {
    if (connection) {
      console.log("in the final block");
      connection.end();
    }
  }
}




export default query;