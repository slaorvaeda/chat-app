import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    chat: {
        type: String,
        
    },
    image:{
        type: String,
        default: null,
    }
},
{ timestamps: true }
);



const Message = mongoose.model("Message", messageSchema);
export default Message;