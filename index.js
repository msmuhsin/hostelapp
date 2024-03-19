import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import xlsxToJson from "./utils/xlsxtojson.js";
import storetodatabase from "./utils/storetodatabase.js";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

storetodatabase();

app.get("/", (req, res) => {
  res.send("helloworld");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
