import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import xlsxToJson from "./utils/xlsxtojson.js";

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

app.use(express.json());

app.get("/test", (req, res) => {
    xlsxToJson("./data/sheet.xlsx")
    res.send("converted");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
