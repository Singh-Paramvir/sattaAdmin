import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";
import { useRouter } from "next/router";

const AddMerchant = () => {
  const [merchantCode, setMerchantCode] = useState("");
  const [merchantEmail, setMerchantEmail] = useState("");
  const [merchantPassword, setMerchantPassword] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [merchantSubTitle, setMerchantSubTitle] = useState("");
  const [merchantSMSHeader, setMerchantSMSHeader] = useState("");
  const [merchantAddress, setMerchantAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleAddMerchant = async (e) => {
    e.preventDefault();

    const data = {
      MerchantCode: merchantCode,
      MerchantEmail: merchantEmail,
      MerchantIntro:merchantPassword,
      MerchantName:merchantName,
      MerchantSubTitle: merchantSubTitle,
      MerchantSMSHeader: merchantSMSHeader,
      MerchantAddress: merchantAddress,
    };

    try {
      console.log(data,"here");
      const token = localStorage.getItem("token");
      // setIsLoading(true);
      console.log(data,"dfdfdfdf");
      let res = await axios.post("/api/addMerchant", { token: token, data });
      setIsLoading(false);
      notify("Merchant user added successfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Error adding merchant:", err);
      setIsLoading(false);
      notifyError("Failed to add merchant user. Please try again.");
    }
  };

  const notify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="new-dashboard">
      <SideBar />
      <section className="profile-sec profile-sects">
        <div className="container">
          <div className="row">
           
            <div className="col-md-10 offset-md-1">
              <div style={styles.addMerchantBox}>
                <h2 style={styles.title}>Add Merchant User</h2>
                <Form onSubmit={handleAddMerchant}>
                  <Form.Group controlId="merchantCode">
                    <Form.Label>Merchant Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Merchant Code"
                      value={merchantCode}
                      onChange={(e) => setMerchantCode(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="merchantEmail">
                    <Form.Label>Merchant Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Merchant Email"
                      value={merchantEmail}
                      onChange={(e) => setMerchantEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="merchantPassword">
                    <Form.Label>Merchant Password</Form.Label>
                    <Form.Control
                      type="Password"
                      placeholder="Enter Merchant Password"
                      value={merchantPassword}
                      onChange={(e) => setMerchantPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="MerchantName">
                    <Form.Label>Merchant Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Merchant Name"
                      value={merchantName}
                      onChange={(e) => setMerchantName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  

                  <Form.Group controlId="merchantSubTitle">
                    <Form.Label>Merchant SubTitle</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Merchant SubTitle"
                      value={merchantSubTitle}
                      onChange={(e) => setMerchantSubTitle(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="merchantSMSHeader">
                    <Form.Label>Merchant SMS Header</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Merchant SMS Header"
                      value={merchantSMSHeader}
                      onChange={(e) => setMerchantSMSHeader(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="merchantAddress">
                    <Form.Label>Merchant Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Merchant Address"
                      value={merchantAddress}
                      onChange={(e) => setMerchantAddress(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button style={{ marginTop: '20px' }} variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Merchant"}
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  addMerchantBox: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "800px", // Increased width
    textAlign: "center",
    margin: "40px auto", // Increased top space and centered horizontally
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
};

export default AddMerchant;
