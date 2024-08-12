import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // const session = await getSession({ req });
  
  if (req.method === "POST") {
    try {
      const {data} = req.body;
      const {token} = req.body;

      console.log(data,token,"here logs");
      

      var config = {
        method: "post",
        url: "http://64.227.157.92:4000/api/v1/admin/deleteUser",
        headers: {
          'Authorization': `Bearer ${token}`
        },data
      };

      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err.message });
    }
  }
}
