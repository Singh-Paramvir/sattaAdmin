import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useRouter } from "next/router";
import Navbar from "./ui/Navbar";
import SideBar from "./SideBar";

const TeamCount = () => {
  const [referrals, setReferrals] = useState([]);
  const router = useRouter();  // Move the router definition inside the component body
  const [todayMatchCount, setTodayMatchCount] = useState(0);
  const [totalMatchCount, setTotalMatchCount] = useState(0);

  const handleViewClick =async (id, mobileNumber) => {
    console.log(id, "inside");
    const token = localStorage.getItem("token");
    const data = {
      id
    }
      let res = await axios.post("/api/2fa",{token,data});
      console.log(res,"res herer");
      window.location.reload("/teamCount");
   
  };

  async function rightCount() {
    try {

      const token = localStorage.getItem("token");
      let res = await axios.post("/api/leftRightCount",{token});
      console.log(res.data.data, 'ehlloooffk')
      setReferrals(res.data.data);
      console.log(res.data.data.todayUsersData,"hea dfjdjfndfiukfh");
      if (res.data.data.todayUsersData && res.data.data.todayUsersData.length > 0) {
        console.log(res.data.data.todayUsersData[0].total,"???????");
        setTotalMatchCount(res.data.data.todayUsersData[0].total);
      } else {
        console.error("Data2 array is empty or undefined");
      }

      if (res.data.data.totalUsersData && res.data.data.totalUsersData.length > 0) {
        setTodayMatchCount(res.data.data.totalUsersData[0].total);
      } else {
        console.error("Data1 array is empty or undefined");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    rightCount();
  }, []);

  return (
    <div>
       {/* <div style={{ marginBottom: "10px", backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "1px" }}>
              <h5 style={{ margin: 0, color: "#007bff" }}>Total Users: {todayMatchCount}</h5>
            </div>
            <div style={{ marginBottom: "10px", backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "1px" }}>
              <h5 style={{ margin: 0, color: "#007bff" }}>Today's Users: {totalMatchCount}</h5>
            </div> */}

      <section className="profile-sec">
        <div className="container">
          <div className="row justify-content-center">
            <form className="input-sec" id="ref-code">
              <h3 className="heading-text pink-text mt-2">
                All Users Data
              </h3>
              <table className="table funds-table mt-3" id="funds-color">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>UniqueId</th>
                    <th>Levels</th>
                    <th>Name</th>
                   
                    <th>Booster</th>
                    <th>Shields</th>
                    <th>IsPurchase</th>
                    <th>RegisterDate</th>
                    <th>DeleteUser</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.length > 0 ? (
                    referrals.map((referral, index) => (
                      <tr key={referral.Uniqeid}>
                        <td>{index + 1}</td>
                        <td>{referral.Uniqeid}</td>
                        <td>{referral.levels}</td>
                        
                      
                        <td>{referral.name}</td>
                        <td>{referral.buster}</td>
                        <td>{referral.shileld}</td>
                        <td>{referral.isPurchase !== 0 ? "Yes" : "No"}</td>
                         <td>{new Date(referral.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                        <td>
                          <Button color="danger" type="button" onClick={() => handleViewClick(referral.Uniqeid,referral.Uniqeid)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      {/* <td colSpan="4">No data found</td> */}
                    </tr>
                  )}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamCount;
