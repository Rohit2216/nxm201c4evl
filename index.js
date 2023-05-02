const express=require("express")
const { connection } = require("./config/db")
const redisClient=require("./helpers/redis")
const {userRouter}=require("./routers/user.routes")
const {cityRouter}=require("./routers/city.router")

const logger=require("./Logger/logger")
require("dotenv").config()


const Port=process.env.Port || 8800
const app=express()


app.use(express.json())

app.get("/",async(req,res)=>{
    res.send("HomePage")
})

app.use("/api/user",userRouter)
app.use("/api/city",cityRouter)

app.listen(Port,async(req,res)=>{
    try {
        await connection
        console.log("Conected to DB, Succcessfully!")
        logger.log("info","DataBase Connected")
    } catch (error) {
        console.log(error.message)
        logger.log("error","Oops! Not conected to DB")
    }
    console.log("Server is running on ",Port)
  
})