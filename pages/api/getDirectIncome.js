import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "POST") {
    try {
      var config = {
        method: "post",

        url: "http://16.171.110.81:3000/api/admin/getalluser",

        headers: {
          Authorization: `Bearer ${session.user.name} `,
        },
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}