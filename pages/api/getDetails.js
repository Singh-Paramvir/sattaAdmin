import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { token, slotId } = req.body; // Extract token and slotId from request body
      console.log(token, slotId, "gussa chad da");

      var config = {
        method: "post",
        url: "http://143.110.230.29:4000/api/v1/admin/getcountofbidnumber",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { slotId } // Pass slotId as part of the request data
      };

      const response = await axios(config);
      console.log(JSON.stringify(response.data));
      res.status(200).json({ data: response.data.data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ Error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
