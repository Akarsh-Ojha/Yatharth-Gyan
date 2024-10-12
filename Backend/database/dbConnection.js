import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    })
    .then(()=>console.log('Database connected'))
    .catch((err)=>console.log(`error in database connection: ${err}`))
}