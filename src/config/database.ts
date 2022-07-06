import * as dotenv from "dotenv";
dotenv.config();
import * as mongoDB from "mongodb";

export const collections: { db?: mongoDB.Db } = {}

export const connectDB = async () => {
    
    const client: mongoDB.MongoClient = new mongoDB.MongoClient('mongodb+srv://minion1708:Tinkerbell170413@cluster0.zcowk.mongodb.net/?retryWrites=true&w=majority');       
    await client.connect();
    
    const db: mongoDB.Db = client.db('myProject');

    collections.db = db;
    
    console.log(`Successfully connected to database: ${db.databaseName}`);
}
export default {
    connectDB
}