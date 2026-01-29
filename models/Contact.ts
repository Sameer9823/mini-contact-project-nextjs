import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
        ],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true,
        maxlength: [500, "Message cannot exceed 500 characters"],
    },
    status: {
        type: String,
        enum: ["new", "in-progress", "resolved"],
        default: "new",
    },
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;