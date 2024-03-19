import studentModel from "../models/student.js";
import StudentData from "../data/convertedSheet.json" assert { type: "json" };

export default async () => {
  for (const data of StudentData) {
    const admnNo = data["Adm No"];
    const regNo = data["Reg No"];
    const applNo = data["Appl No"];
    const name = data["Name"];
    const gender = data["Gender"];
    const dob = data["DOB"];
    const mobile = data["Mobile"];
    const email = data["eMail"];
    const permanentAddress = data["Permanent Address"];
    const presentAddress = data["Present Address"];
    const pincode = data["PinCode"];
    const distance = data["Distance"];
    const caste = data["Caste"];
    const quota = data["Quota"];
    const income = data["Income"];
    const branch = data["Branch"];
    const sem = data["Sem"];
    const cgpa = data["CGPA"];

    try {
      const student = new studentModel({
        applNo: applNo,
        admnNo: admnNo,
        regNo: regNo,
        name: name,
        gender: gender,
        dob: dob,
        mobile: mobile,
        email: email,
        permanentAddress: permanentAddress,
        presentAddress: presentAddress,
        pincode: pincode,
        distance: distance,
        caste: caste,
        quota: quota,
        income: income,
        branch: branch,
        sem: sem,
        cgpa: cgpa,
      });

      await student.save();
      console.log(`Student ${applNo} saved successfully.`);
    } catch (error) {
      console.error(`Error saving student ${applNo}:`, error);
    }
  }
};
