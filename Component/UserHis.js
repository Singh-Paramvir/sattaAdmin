import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSession } from 'next-auth/react';

let moon;
let id;
let uniqueid;
const MyRefferal = () => {
  const router = useRouter();
  const { id: queryId,uniqueid } = router.query;
  const [referrals, setReferrals] = useState([]);
  const firstRef = useRef();
  const firstRef1 = useRef();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session) {
        // Handle the case when the session is not available
        console.error("Session not available");
        return;
      }

      console.log("Received id:", queryId);
      uniqueid = uniqueid;
      const data = {
        id: queryId
      };

      console.log(data, "before send");
      console.log(session.user?.name, "before send!!!!");
      try {
        
        const response = await axios.post("/api/userHis", { token: session.user?.name, data });

        console.log("Response data:", response.data);

        const responseData = response.data.data.data;
        setReferrals(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (queryId) {
      fetchData();
    } else {
      console.log("queryId is undefined.");
    }
  }, [queryId,uniqueid]);

  console.log('Referrals:', referrals);
  
  return (
    
    <div>
     
      <section className="profile-sec">
        <div className="container">
          <div className="row justify-content-center">
            <form className="input-sec" id="ref-code">
              <h3 className="heading-text pink-text mt-2">
                <span
                  className="arrows-icon"
                  id="left-rfset"
                  style={{
                    position: "relative",
                    left: "-44%",
                    cursor: "pointer",
                  }}
                >
                 
                </span>
                UserHistory 
              </h3>

              <table className="table funds-table mt-3" id="funds-color">
                <thead>
                  <tr>
                    <th >
                      Sr. No.
                    </th>
                    <th >
                      UserId
                    </th>
                    <th >
                      Time
                    </th>
                    <th >
                      Date
                    </th>
                   
                  </tr>
                </thead>

                <tbody>
  {referrals.length > 0 ? (
    referrals.map((referral, index) => (
      <tr key={referral._id}>
        <td>{index + 1}</td>
        <td>{uniqueid}</td>
        <td>{referral.time}</td>
        <td>{new Date(referral.createdAt).toLocaleDateString()}</td>
      
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4">No data found</td>
    </tr>
  )}
</tbody>
              </table>
            </form>
          </div>
        </div>
      </section>
    </div>
    // model
    
  );
};

export default MyRefferal;
