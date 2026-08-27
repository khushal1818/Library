import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connect("mongodb+srv://crazystickstories888_db_user:tRPHAeotFXE2kMmO@cluster0.vasbsdk.mongodb.net/LibraryManagement")
    .then(() => {
        console.log("DB CONNECTED")
    })
}
