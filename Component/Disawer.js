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

const Disawer = () => {
  const [data, setData] = useState([]); // Initialize state for data
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Details modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for modal
  const [selectedDetails, setSelectedDetails] = useState([]); // State for details
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
      let res = await axios.post("/api/leftRightCount", { token: token });
      setData(res.data.data); // Set the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSetResultClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDetailsClick = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/getDetails", { slotId: 4, token: token });

      setSelectedDetails(response.data.data); // Set the details from the API response
      setSelectedItem(item); // Set the selected item to show in modal header
      setShowDetailsModal(true); // Show the details modal
    } catch (error) {
      console.error("Error fetching details:", error);
      toast.error("Error fetching details");
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleDetailsModalClose = () => setShowDetailsModal(false); // Close details modal

  const handleDropdownChange = (e) => setDropdownValue(e.target.value);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/setResult3", { token: token, value: dropdownValue });
      toast.success("Result set successfully");
      setShowModal(false);
      window.location.reload();
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
              <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "30px" }}>
                <h2 className="dashboard-heading">Disawer Data</h2>
              </div>
              <div className="table-responsive" style={{ marginTop: "20px" }}>
                <table className="table table-striped table-bordered" style={{ fontFamily: "Satoshi, sans-serif" }}>
                  <thead>
                    <tr>
                      <th>Slote Name</th>
                      <th>Total Amount</th>
                      <th>Total Buyers</th>
                      <th>Result Time</th>
                      <th>Action</th> {/* New column for actions */}
                      <th>Details</th> {/* New column for details */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.sloteName}</td>
                        <td>{item.totalAmount}</td>
                        <td>{item.totalBuyers}</td>
                        <td> After {item.toTime}</td>
                        <td>
                          <Button variant="primary" onClick={() => handleSetResultClick(item)}>
                            Set Result
                          </Button>
                        </td>
                        <td>
                          <Button variant="info" onClick={() => handleDetailsClick(item)}>
                            View Details
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
              <Form.Control as="select" value={dropdownValue} onChange={handleDropdownChange}>
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

      {/* Modal for showing details */}
      <Modal show={showDetailsModal} onHide={handleDetailsModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details for {selectedItem?.sloteName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Akhar Number</th>
                <th>Count</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(selectedDetails) && selectedDetails.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.akharNum}</td>
                  <td>{detail.count}</td>
                  <td>{detail.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailsModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Disawer;
