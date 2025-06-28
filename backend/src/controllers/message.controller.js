import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../libs/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password ');
        
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        
        res.status(200).json(users);

    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async(req,res) =>{
    try {
        const {id:userToChatId} = req.params.id;
        const myId = req.user._id;
    
        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId }
            ]
        })

        res.status(200).json(messages);
        
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }

}


export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId } = req.params;
        const senderId = req.user._id;
        
        let imageUrl ;
        if (image) {
            const uplodeResponse = await cloudinary.uploder.upload(image);

            imageUrl = uplodeResponse.secure_url;

        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        await newMessage.save();

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}