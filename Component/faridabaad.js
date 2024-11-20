import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Faridabaad = () => {
  const [data, setData] = useState([]); // Initialize state for data
  const [showModal, setShowModal] = useState(false); // Modal visibility state for setting result
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Modal visibility state for details
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for modal
  const [details, setDetails] = useState(null); // State to hold details data
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
      window.location.reload();
    } catch (error) {
      toast.error("Error setting result");
      console.error("Error setting result:", error);
    }
  };

  // Function to fetch details and open details modal
  const handleViewDetailsClick = async (item) => {
    try {
      const token = localStorage.getItem("token");
      console.log(item.slotId,"item.slotId");
      
      const res = await axios.post("/api/getDetails", { slotId: 1, token: token });
      setDetails(res.data); // Store fetched details
      setShowDetailsModal(true); // Open modal
    } catch (error) {
      toast.error("Error fetching details");
      console.error("Error fetching details:", error);
    }
  };

  const handleDetailsModalClose = () => setShowDetailsModal(false);

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
                      <th>Result Time</th>
                      <th>Action</th> {/* Existing column for actions */}
                      <th>Details</th> {/* New column for viewing details */}
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
                          <Button
                            variant="primary"
                            onClick={() => handleSetResultClick(item)}
                          >
                            Set Result
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="info"
                            onClick={() => handleViewDetailsClick(item)}
                          >
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

      {/* Modal for viewing details */}
    {/* Modal for viewing details */}
<Modal show={showDetailsModal} onHide={handleDetailsModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {details && details.data ? (
      <div>
        {/* <p><strong>Details Data:</strong></p> */}
        {/* Render fetched details in a table */}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Akhar Number</th>
              <th>Count</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {details.data.map((detail, index) => (
              <tr key={index}>
                <td>{detail.akharNum}</td>
                <td>{detail.count}</td>
                <td>{detail.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>Loading details...</p>
    )}
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

export default Faridabaad;
