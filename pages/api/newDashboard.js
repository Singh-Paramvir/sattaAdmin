import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "POST") {
    try {
      const {token} = req.body;
      console.log(token, "token to be send to api new dashboard")
      var config = {
        method: "post",
        url: "http://52.45.20.15:4000/api/v1/member/newDashboard",
        headers: {
         Authorization: `Bearer ${session.user?.name} `,
        },
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

