const {Router}=require("express");
const {signup,login,logout}=require("../controllers/user.controllers")
const {auth}=require("../middlewares/auth")

const userRouter=Router();

userRouter.post("./signup",signup)
userRouter.post("/login",login)
userRouter.get("logout",auth,logout)


module.exports={
    userRouter
}