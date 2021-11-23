const express = require('express');
var cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const env = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const restaurantRoute = require("./routes/restaurants");
const orderRoute = require("./routes/order");
const ngrok = require('ngrok');

env.config()
app.use(cors())
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/order", orderRoute);

app.get("/", async (req, res) => {
    res.status(200).json("Deployed");
});

app.get("/ngrok", async (req, res) => {
    const url = await ngrok.connect();
    res.status(200).json(url);
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Running PORT ");
});