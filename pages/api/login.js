import axios from "axios";


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      // const agent = new http.Agent({
      //   rejectUnauthorized: false,
      // });
      console.log(data, "to be send to api!!!!!!!!!!");
    
      var config = {
        method: "post",
        url: "http://143.110.230.29:4000/api/v1/auth/adminLogin",
        data,
        // httpAgent: agent
      };
      
      await axios(config).then(function (response) {
      //  console.log(JSON.stringify(response.data));
        res.status(200).json({ data: response.data});
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
