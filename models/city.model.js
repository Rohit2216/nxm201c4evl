const mongoose = require("mongoose")

const userCity = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    previousSearches: [{ type: String, required: true }]
})

const CityList = mongoose.model("city", userCity)

module.exports = CityList