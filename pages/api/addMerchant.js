import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // const session = await getSession({ req });
  if (req.method === "POST") {
    try {
      const { token, data } = req.body; // Extract token and other data
    

      var config = {
        method: "post",
        url: "https://new.suibox.my/api/v1/superAdmin/addMerchant",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }, data, // Pass data directly
      };

      const response = await axios(config);
      console.log(JSON.stringify(response.data));
      res.status(200).json({ data: response.data.data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ Error: err.message });
    }
  }
}
