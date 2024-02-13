import axios from "axios";
import base64 from "react-native-base64";

// Define the URL for the POST request
const url = "https://api.razorpay.com/v1/orders";

// Define the data you want to send in the POST request

// Define your API key and secret key for Basic Auth
const apiKey = process.env.RAZORPAY_KEY_ID;
const secretKey = process.env.RAZORPAY_KEY_SECRET;

// Make the POST request using Axios with Basic Auth
export const getOrder_id = async (amount: number) => {
  const postData = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
    partial_payment: false,
    notes: {
      key1: "value3",
      key2: "value2",
    },
  };

  let order_id = "";

await axios
    .post(url, postData, {
      headers: {
        Authorization:
          "Basic " +
          base64.encode("rzp_test_IKwLnkrt4wamMz:6Fz80pVlSjg9096uzQVTXsyu"),
      },
    })
    .then((response: any) => {
      console.log("id", response.data.id);
      order_id = response.data.id; // Return the Order ID from the Response Data
    })
    .catch((error: Error) => {
      console.error("Error:", error);
    });

  return order_id;
};
