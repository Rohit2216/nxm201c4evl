const {Router } = require("express");
const { auth } = require("../middlewares/auth");
const {getCityForIP}=require("../controllers/ip")

const redisLimiter = require("../middlewares/redis-limiter");

const cityRouter = Router();

cityRouter.get("/:city",auth,getCityForIP);

module.exports = cityRouter;