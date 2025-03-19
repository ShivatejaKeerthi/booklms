import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
        });
    } else {
        res.status(400).json({ message: "Invalid User Data" });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log("Login Attempt:", { email, password });

    const user = await User.findOne({ email });

    if (!user) {
        console.log("User not found");
        return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User Found:", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isPasswordValid);

    if (isPasswordValid) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};

const makeAdmin = async (req, res) => {
    const { email } = req.body; 

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = "admin"; 
        await user.save();

        res.json({ message: `User ${email} is now an admin.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { registerUser, loginUser, makeAdmin };