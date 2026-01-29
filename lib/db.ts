import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/contact";

let isConnected = false;

export const connectToDatabase = async () => {
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        const db = await mongoose.connect(mongoUrl);
        isConnected = db.connections[0].readyState === 1;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};