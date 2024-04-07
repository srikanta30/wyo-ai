require("dotenv").config();
const axios = require("axios");

exports.send = async (phone, otp) => {
  try {
    const to = phone;
    const body =
      "One Time Password to verify your mobile number is " +
      otp +
      ". Team WYO - Wear Your Opinion";

    await axios.post(
      `https://api.exotel.com/v1/Accounts/wyo/Sms/send`,
      `To=${to}&Body=${body}`,
      {
        auth: {
          username: process.env.SMS_API_KEY,
          password: process.env.SMS_API_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return { status: true, msg: "OTP sent to your mobile number." };
  } catch (error) {
    throw new Error(error);
  }
};
