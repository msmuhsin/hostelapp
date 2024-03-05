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

        // Convert Excel serial dates back to JavaScript Date objects
        const convertedData = jsonData.map((row) => {
            if (row.DOB) {
                row.DOB = ExcelDateToFormattedDate(row.DOB);
            }
            // Add similar conversions for other date fields if needed

            return row;
        });

        // Store convertedData to file 
        fs.writeFileSync("./data/convertedSheet2.json", JSON.stringify(convertedData, null, 2));

    } catch (error) {
        console.error(error);
    }
}


function ExcelDateToFormattedDate(serial) {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    var year = date_info.getFullYear();
    var month = date_info.getMonth() + 1; // Months are zero-indexed, so add 1
    var day = date_info.getDate();
    
    var formattedMonth = month < 10 ? '0' + month : month;
    var formattedDay = day < 10 ? '0' + day : day;

    // Format the date as dd-mm-yyyy
    var formattedDate = formattedDay + '-' + formattedMonth + '-' + year;

    return formattedDate;
}
