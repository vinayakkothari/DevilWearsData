import mongoose from "mongoose";

const connectToMongoDb=async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to Mongo DB")
    } catch (error) {
        console.log("Error connecting to MongoDB",error.message)
    }
}
export default connectToMongoDb;