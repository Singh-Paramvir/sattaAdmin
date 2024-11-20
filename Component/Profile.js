import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";
import { signOut, useSession } from "next-auth/react";


function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 4000));
}

const Profile = ({ props }) => {
  // console.log(props.token.name);

 
  const [email, setEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");


  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRef, setLoadingRef] = useState(false);


  const router = useRouter();

  async function getUserStatus() {
    try {
      //let res = await axios.post("/api/getuserid");
      let storedEmail = localStorage.getItem("email")
      setEmail(storedEmail);
    } catch (err) {
      console.log(err);
      setLoadingRef(false);
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getUserStatus();
  }, []);

 

  async function formSubmitHandler(event) {
    event.preventDefault();
  
    try {
      let email = localStorage.getItem("email")
      const data = {
        email,
        newemail: newEmail,
      };
     console.log(data,"emai; to update");

     let res = await axios.post("/api/2fa",data);
     localStorage.setItem('email', newEmail);
     const response = res.data;
      console.log(response,"rescpoinse");
      toast.success("User Profile Updated Successfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  }
  

 

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoadingRef(true);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoadingRef(false);

  return (
    <div className="new-dashboard ">
      <SideBar />
      <section className="profile-sec profile-sects">
        <div className="container">
          <div className="row justify-content-center">
            <Navbar />
            <ToastContainer />

            <form
              className="input-sec input-top p-0"
              id="form-setup"
              onSubmit={formSubmitHandler}
            >
              <div className="input-line" id="index-line"></div>

              <div className="padding-set">
                {/* <h3 className="heading-text mt-4">
                  {" "}
                  Join the Global Community
                </h3> */}
                <h2 id="coin-master-heading"> Update Email</h2>
                {/* <img className="stier-logo" src="/navbar/white-logo.png"></img> */}

                <div className="input-item">
                  <h6 className="item-text"> EMAIL</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0 "
                    id="mb-set"
                  >
                   <input
  type="email"
  className="form-control form-border"
  value={newEmail}
  onChange={(e) => setNewEmail(e.target.value)}
  aria-label="Username"
  aria-describedby="addon-wrapping"
/>
                  </div>
                </div>

             

             

                <div className="input-item mb-4" id="kyc-sec">
                

                 
                </div>

         

                <Button
                  variant="primary"
                  className="btn btn-round btn-warning w-100 "
                  style={{ marginTop: "0px", marginBottom: "20px" }}
                  type="submit"
                  disabled={isLoading}
                  onClick={!isLoading ? handleClick : null}
                >
                  {isLoadingRef ? "Loading…" : "     UPDATE"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
