import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"; // Import Form from bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Faridabaad = () => {
  const [data, setData] = useState([]); // Initialize state for data
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for modal
  const [dropdownValue, setDropdownValue] = useState(""); // Dropdown value state
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkToken = localStorage.getItem("token");

    if (!checkToken) {
      router.push("/");
    } else {
      fetchFaridabaadData();
    }
  }, []);

  const fetchFaridabaadData = async () => {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/directincome", { token: token });

      console.log(res.data.data, "res.data.data");
      
      setData(res.data.data); // Set the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSetResultClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleDropdownChange = (e) => setDropdownValue(e.target.value);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/setResult", { token: token, value: dropdownValue });
      toast.success("Result set successfully");
      setShowModal(false);
    } catch (error) {
      toast.error("Error setting result");
      console.error("Error setting result:", error);
    }
  };

  const logoutHandler = () => {
    window.localStorage.clear();
    signOut();
  };

  return (
    <div className="new-dashboard">
      <SideBar />
      <section className="profile-sec profile-sects">
        <div className="container">
          <div className="row">
            <Navbar />
            <div className="col-md-12">
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ marginTop: "30px" }}
              >
                <h2 className="dashboard-heading">Faridabaad Data</h2>
              </div>
              <div className="table-responsive" style={{ marginTop: "20px" }}>
                <table
                  className="table table-striped table-bordered"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                >
                  <thead>
                    <tr>
                      <th>Slote Name</th>
                      <th>Total Amount</th>
                      <th>Total Buyers</th>
                      <th>Action</th> {/* New column for actions */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.sloteName}</td>
                        <td>{item.totalAmount}</td>
                        <td>{item.totalBuyers}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => handleSetResultClick(item)}
                          >
                            Set Result
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for setting result */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDropdown">
              <Form.Label>Select Option</Form.Label>
              <Form.Control
                as="select"
                value={dropdownValue}
                onChange={handleDropdownChange}
              >
                <option value="">Select...</option>
                <option value="random">Random</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Faridabaad;
