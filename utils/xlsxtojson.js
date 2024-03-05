import fs from "fs";
import xlsx from "xlsx";

export default function xlsxToJson(filePath) {

    if (!filePath) {
        console.error("File path is required");
        return;
    }

    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // assuming the data is in the first sheet
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        // store jsonData to file 
        fs.writeFileSync("data.json", JSON.stringify(jsonData, null, 2));

    } catch (error) {
        console.error(error);
    }
}