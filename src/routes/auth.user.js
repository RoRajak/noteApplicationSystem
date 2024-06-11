import express from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { User } from '../model/user.model.js';

const router=express.Router();

router.post('/register',async(req,res)=>{
    const {username,email,password}=req.body;
    
    if (!username|| !email || !password) {
        return res.json({msg:"please enter the required field"})
    }

    try {
        let user= await User.findOne({username});
        if(user){
            return res.json({msg:'user is already exist'})
        }

        user= new User({
            username,
            email,
            password
        })
        user.password= await bcrypt.hash(password,10)

        await user.save()

        const payLoad={
            user:user._id,
        }

        jwt.sign(payLoad,process.env.JWT_SECRET,(err,token)=>{
            if(err){
                throw err;
            }
            res.json({msg:token})
        })
    } catch (error) {
        console.error(error)
        return res.json({msg:"server error"})
    }
})

router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    console.log(req.body);
    if (!username|| !password) {
        return res.json({msg:"please enter the required field"})
    }
    //find the user if existed
    //check the password and match the password from database
    //

    try {
        const user = await User.findOne({username});

        if(!user){
            return res.json({msg:"user is not existed"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({msg:'credential is invalied'})
        }

        const payLoad={
            user:user._id
        }

        jwt.sign(payLoad,process.env.JWT_SECRET,(err,token)=>{
            if(err){
                throw err;
            }
            res.json({msg:token})
        })
    } catch (error) {
        console.error(error)
        return res.json({msg:"server error"})
    }

})


export default router

