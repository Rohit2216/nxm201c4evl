
const jwt=require("jsonwebtoken")
const redisClient=require("../helpers/redis")

const auth=async (req,res,next)=>{

    try {
        const token=req.headers?.authorization?.split(" ")[1]

        if(!token){
            return res.status(401).send("Please login first")
        }

        const isTokenValid=await jwt.verify(token,process.env.JWT_secret);

        const isTokenBlacklisted= await redisClient.get(token);

        if(!isTokenBlacklisted){
            return res.send("UnAuthorized...")
        }

        req.body.userId=isTokenValid.userId;
        req.body.city=isTokenValid.city;


        next()
    } catch (error) {
        res.send(error.message)
    }
}


module.exports={
    auth
}