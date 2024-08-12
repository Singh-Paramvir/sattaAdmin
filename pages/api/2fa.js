import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // const session = await getSession({ req });
  
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log( "---------", data);

      const apiResponse = await axios.post(
        "http://44.200.180.0:7777/api/v1/auth/changeemail",
        data,
       
      );

      res.status(200).json({ data: apiResponse.data.data });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err.message });
    }
  }
}
