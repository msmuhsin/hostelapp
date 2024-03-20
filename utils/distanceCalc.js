import axios from "axios";
import { calculate } from "pincode-distance-calculator";
import dotenv from "dotenv";
dotenv.config();


const getPincodeData = async (pincode) => {
    const options1 = {
        method: 'GET',
        url: `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${pincode}`,
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY_PINCODE,
            'X-RapidAPI-Host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
        }
    };

    try {
        const response1 = await axios.request(options1);
        console.log(response1.data);

        return {
            pincode: response1.data[0].pincode,
            lat: response1.data[0].lat,
            lng: response1.data[0].lng
        }


    } catch (error) {
        console.error(error);
    }
}

const calculateDistance = async (pincode1, pincode2) => {
    try {
        const pincode1Data = await getPincodeData(pincode1);
        const pincode2Data = await getPincodeData(pincode2);

        if (!pincode1Data || !pincode2Data) {
            throw new Error("Invalid pincode");
        }


        const data = {
            [pincode1Data.pincode]: {
                latitude: pincode1Data.lat,
                longitude: pincode1Data.lng
            },
            [pincode2Data.pincode]: {
                latitude: pincode2Data.lat,
                longitude: pincode2Data.lng
            }
        };


        const distance = calculate(pincode1, pincode2, data);
        return distance;
    } catch (error) {
        console.error(error);
    }
}


calculateDistance(676503, 680009).then((result) => {
    console.log(result);
}).catch((err) => { 
    console.log(err);
});