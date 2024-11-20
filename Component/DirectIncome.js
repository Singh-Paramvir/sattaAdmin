import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";

const TablePage = () => {
  const [referrals, setReferrals] = useState([]);

  async function directincome() {
    try {
      let res = await axios.post("/api/getUserDirectIncome");
      const response = res.data;

     
      console.log(response.data.data, "response data");
      setReferrals(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      // setLoading(false);
    }
  }

  useEffect(() => {
    directincome();
  }, []);

  return (
    <>
      <div className="new-dashboard">
        <SideBar />
        <section className="profile-sec profile-sects">
          <div className="container">
            <div className="row justify-content-center">
              <Navbar />
              <form className="input-sec" id="ref-code">
                <h3 className="heading-text pink-text mt-2 ">
                  PURCHASE USER
                  <Link href={"/dashboard"}>
                    <span
                      className="arr-icon"
                      style={{
                        position: "relative",
                        left: "-48%",
                        cursor: "pointer",
                      }}
                    >
                      <img src="" className="icon-width" />
                    </span>
                  </Link>
                </h3>

                
                <table className="table funds-table mt-3" id="funds-color">
  <thead>
    <tr>
      <th>Sr. No.</th>
      <th>UserId</th>
      <th>IsPurchase</th>
      <th>Date</th>
    </tr>
  </thead>

                  <tbody>
                  {referrals.length > 0 ? (
  referrals.map((referral, index) => (
    <tr key={index + 1}>
      <td>{index + 1}</td>
      <td>{referral.uniqueid}</td>
      <td>{referral.purchaseapp === 1 ? 'Yes' : 'No'}</td>
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
    </>
  );
};

export default TablePage;
