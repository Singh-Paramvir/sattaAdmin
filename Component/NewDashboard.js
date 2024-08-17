import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab, Nav } from "react-bootstrap";

const MerchantList = () => {
  const [users, setUsers] = useState([]); // Initialize state for users
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedUser, setSelectedUser] = useState(null); // Selected slot for editing
  const [depositData, setDepositData] = useState({ totalDeposit: 0, todaysDeposit: 0 }); // State for deposit data
  const [updatedSlot, setUpdatedSlot] = useState({
    sloteName: "",
    price: "",
    entryFee: "",
    toTime: "",
  });

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkToken = localStorage.getItem("token");

    if (!checkToken) {
      router.push("/");
    } else {
      fetchMerchantUsers();
      fetchDepositData(); // Fetch deposit data on component mount
    }
  }, []);

  const fetchMerchantUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/userHis", { token: token });
      setUsers(res.data.data.data); // Set the fetched data to users state
    } catch (error) {
      console.error("Error fetching merchant users:", error);
    }
  };

  const fetchDepositData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/changepassword", { token: token });
      console.log(res,"qwerty");
      
      setDepositData(res.data.data); // Set the deposit data
    } catch (error) {
      console.error("Error fetching deposit data:", error);
    }
  };

  const logoutHandler = () => {
    window.localStorage.clear();
    signOut();
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

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setUpdatedSlot({
      sloteName: user.sloteName,
      price: user.price,
      entryFee: user.entryFee,
      toTime: user.toTime,
    });
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSlot((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async () => {
    try {
      console.log("api update call");
      
      const token = localStorage.getItem("token");
      const data = {
        slotId: selectedUser.id, // Use the selected slot ID
        sloteName: updatedSlot.sloteName,
        price: updatedSlot.price,
        fromTime: updatedSlot.fromTime, // Ensure this value is captured or passed correctly
        toTime: updatedSlot.toTime,
        entryFee: updatedSlot.entryFee,
      };
  
      const response = await axios.post(`/api/updateSlot`, { token: token, data });
      notify("Slot updated successfully");
      setShowModal(false);
      fetchMerchantUsers(); // Refresh the list after update
    } catch (error) {
      notifyError("Failed to update slot");
      console.error("Error updating slot:", error);
    }
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
                <h2 className="dashboard-heading">Slot List</h2>
                {/* Display deposit data */}
                <div className="deposit-info">
                  <div>Total Deposit: ₹{depositData.totalDeposit}</div>
                  <div>Today's Deposit: ₹{depositData.todaysDeposit}</div>
                </div>
              </div>
              <div
                className="table-responsive"
                style={{ marginTop: "20px" }}
              >
                <table
                  className="table table-striped table-bordered"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Slot Name</th>
                      <th>Till Time</th>
                      <th>Action</th> {/* New column for actions */}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.sloteName}</td>
                        <td>{user.toTime}</td>
                        <td>
                          <button
                            onClick={() => handleEditClick(user)}
                            className="btn btn-sm btn-primary"
                          >
                            Edit
                          </button>
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

      {/* Modal for editing slot */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Slot Name</label>
            <input
              type="text"
              className="form-control"
              name="sloteName"
              value={updatedSlot.sloteName}
              onChange={handleUpdateChange}
            />
          </div>
         
         
          <div className="form-group">
            <label>Till Time</label>
            <input
              type="text"
              className="form-control"
              name="toTime"
              value={updatedSlot.toTime}
              onChange={handleUpdateChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default MerchantList;
