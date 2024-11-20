import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // const session = await getSession({ req });
  if (req.method === "POST") {
    try {
      const {token} = req.body;

      var config = {
        method: "post",
        url: "http://143.110.230.29:4000/api/v1/admin/getdisawer",
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
