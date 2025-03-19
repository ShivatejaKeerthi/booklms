import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const protect = async (req,res,next)=>{
    let token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message:'not authorized'});
    }
    try{
        token = token.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }catch(err){
        console.error(err.message);
        res.status(401).json({message:'Invalid Token'});
    }
}

const admin = (req,res,next)=>{
    if(req.user && req.user.role === 'admin'){
        next();
    }else{
        res.status(403).json({message:'Not authorized as an admin'});
    }
}

export {protect,admin};