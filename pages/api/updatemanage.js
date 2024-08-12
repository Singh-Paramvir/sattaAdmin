import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // const session = await getSession({ req });
  
  if (req.method === "POST") {
    try {
      const {data} = req.body;
      const {token} = req.body;

      var config = {
        method: "post",
        url: "https://new.suibox.my/api/v1/superAdmin/editMerchant",
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
