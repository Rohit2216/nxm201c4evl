const user=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const redisClient=require("../helpers/redis")


// signupn or register part here

const signup=async(req,res)=>{
    try {

        const {name, email, password, city}=req.body;
        
        const isUserPresent=await user.findOne({email});

        if(isUserPresent) {
            return res.send("User Alreday Present, Login Here")
        }

        const hash=await bcrypt.hash(password,9);

        const newUsers=new user({name,email,city,password:hash});
        await newUsers.save();

        res.send("Successfully! Signup......")

    } catch (error) {
        res.send(error.message);
    }
}



// login part here


const login=async(req,res)=>{
    try{

        const {email,password}=req.body;

        const isUserPresent = await user.findOne({email})
        
        if(!isUserPresent){
            return res.send("Oops! Users not present,Registers again....")
        }

        const isPasswordCorrect=await bcrypt.comapre(password,isUserPresent.password)
        if(!isPasswordCorrect){
            return res.send("Invalid Credentials")
        }

        const token=await jwt.sign({userId:isUserPresent._id,city:isUserPresent.city},process.env.JWT_secret,{expiresIn:"2h"})

        res.send({msg:"Hurray loging Successfull!"})
    }catch(error){
        res.send(error.message)
    }
}



const logout=async(req,res)=>{
    try {
        const token=req.headers?.authorization?.split(" ")[1]
        
        if(!token) return res.status(403).send("token Invalid")
    
        await redisClient.set(token,token)
        res.send("logout Successfull")
    } catch (error) {
        res.send(error.message)
    }
}


module.exports={
    signup,
    login,
    logout
}