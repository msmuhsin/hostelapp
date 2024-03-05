import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("helloworld");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
