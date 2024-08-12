import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button,Modal ,ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { useRef } from "react";



const TeamCount = () => {
  const [referrals, setReferrals] = useState([]);
  const router = useRouter();  // Move the router definition inside the component body
  const [todayMatchCount, setTodayMatchCount] = useState(0);
  const [totalMatchCount, setTotalMatchCount] = useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);

  let iid;
  const applovinSdkkey = useRef();
  const appopen = useRef()
  const Banneradd = useRef()
  const interstialId = useRef()
  const RewardId = useRef()

  

  const handleViewClick =async (id, mobileNumber) => {
    
    iid = id
    console.log(id, "inside");
    setModalOpen(true);
   
  };

  async function rightCount() {
    try {

      const token = localStorage.getItem("token");
      let res = await axios.post("/api/getaddmanage",{token});
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
  const handleAddChips = async () => {
    try {
      console.log("yess hit");    
     
      let id = 1
      applovinSdkkey = applovinSdkkey.current.value;
      appopen = appopen.current.value;
      Banneradd = Banneradd.current.value;
      interstialId = interstialId.current.value;
      RewardId = RewardId.current.value;

      console.log(id,applovinSdkkey,appopen,Banneradd,interstialId,RewardId,"?>?>?>");
  
      // Create an empty data object
      const data = {};
  
     
      if (applovinSdkkey !== null && applovinSdkkey !== "") {
        data.applovinSdkkey = applovinSdkkey;
      }
      if (appopen !== null && appopen !== "") {
        data.appopen = appopen;
      }
      if (Banneradd !== null && Banneradd !== "") {
        data.Banneradd = Banneradd;
      }
      if (interstialId !== null && interstialId !== "") {
        data.interstialId = interstialId;
      }
      if (RewardId !== null && RewardId !== "") {
        data.RewardId = RewardId;
      }
     
  
       console.log(data, "moon hererererererere ");
       const token = localStorage.getItem("token");
      // console.log(token, "fhfhjfh");
  
      // // api call
      let res = await axios.post("/api/updateaddmanager", { token: token, data });
      const response = res.data;
      console.log(response, "response data");
  
      // Close the modal
      setModalOpen(false);
      console.log("model closed");
  
      // Refresh the page after showing the toast message
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    rightCount();
  }, []);

  return (
    <div>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className="modal-header d-flex justify-content-between align-items-center m-0">
          <h5 className="modal-title">Change Adds Manage </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
        <input
            className="textinput mt-3"
            type="string"
            name="quantity"
            placeholder="Banneradd"
            required
            ref={Banneradd}
          />
          <br></br>
           <input
            className="textinput mt-3"
            type="string"
            name="quantity"
            placeholder="RewardId"
            required
            ref={RewardId}
          />
          <br></br>
          <input
            className="textinput mt-3"
            type="string"
            name="applovinSdkkey"
            placeholder="applovinSdkkey"
            required
            ref={applovinSdkkey}
          />
           <br></br>
          <input
            className="textinput mt-3"
            type="string"
            name="quantity"
            placeholder="appopen"
            required
            ref={appopen}
          />
         
            <br></br>
          <input
            className="textinput mt-3"
            type="string"
            name="quantity"
            placeholder="interstialId"
            required
            ref={interstialId}
          />
            <br></br>
         
        

        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={handleAddChips} // Call handleAddChips function when the "Save Changes" button is clicked
          >
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>

      <section className="profile-sec">
        <div className="container">
          <div className="row justify-content-center">
            <form className="input-sec" id="ref-code">
              <h3 className="heading-text pink-text mt-2">
               Adds Manage
              </h3>
              <table className="table funds-table mt-3" id="funds-color">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Banneradd</th>
                    <th>RewardId</th>
                    <th>ApplovinSdkkey</th>
                   
                    <th>Appopen</th>
                    <th>InterstialId</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.length > 0 ? (
                    referrals.map((referral, index) => (
                      <tr key={referral.id}>
                        <td>{index + 1}</td>
                        <td>{referral.Banneradd}</td>
                        <td>{referral.RewardId}</td>
                        
                      
                        <td>{referral.applovinSdkkey}</td>
                        <td>{referral.appopen}</td>
                        <td>{referral.interstialId}</td>
                   
                        <td>
                          <Button color="primary" type="button" onClick={() => handleViewClick(referral.id,referral.id)}>
                            Update
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
