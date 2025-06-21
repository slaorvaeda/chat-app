import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlenngth: 6,
    },
    profilePic: {
        type: String,
        default: "",
    },
    }, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields    
});

const User = mongoose.model("User", userSchema);

export default User;