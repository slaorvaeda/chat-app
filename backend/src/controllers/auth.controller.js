import cloudinary from '../libs/cloudinary.js';
import { generateToken } from '../libs/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { fullName, email, password, profilePic } = req.body;
    // console.log("req.body:", req.body);
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }


        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            profilePic
        });

        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            });
        }
        else {
            return res.status(400).json({ message: "Failed to create user" });
        }



    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;
    try {

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });


    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 0
        });
        res.status(200).json({ message: "Logged out successfully" });

        // res.cookie('token', '', {maxAge:0});
    }
    catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const user = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }
        const uploadResponce = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            user,
            { profilePic: uploadResponce.secure_url },
            { new: true }
        );

        res.status(200).json({
            updatedUser
        });
    } catch (error) {
        console.error("Error during profile update:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}



export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);

        
    } catch (error) {
        
        console.error("Error during authentication check:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}