import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import xlsx from "xlsx";

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

app.use(express.json());

app.post("/xlsx-to-json", (req, res) => {
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).json({ error: "Missing filePath in the request body." });
    }

    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // assuming the data is in the first sheet
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        res.status(200).json({ data: jsonData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while converting XLSX to JSON." });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
