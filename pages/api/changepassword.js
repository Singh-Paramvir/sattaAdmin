import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {

  if (req.method === "POST") {
    try {
        const data = req.body;
        console.log(data, "data  to send to api")
      var config = {
        method: "post",
        url: "http://44.200.180.0:7777/api/v1/auth/change",
        data
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}

