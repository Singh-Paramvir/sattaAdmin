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

const MerchantList = () => {
  const [users, setUsers] = useState([]); // Initialize state for users
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete confirmation modal visibility state
  const [selectedUser, setSelectedUser] = useState(null); // Selected slot for editing or deleting

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkToken = localStorage.getItem("token");

    if (!checkToken) {
      router.push("/");
    } else {
      fetchMerchantUsers();
    }
  }, []);

  const fetchMerchantUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/getallUsers", { token: token });
      console.log(res.data.data.data, "dsdsdsdsd");

      setUsers(res.data.data.data); // Set the fetched data to users state
    } catch (error) {
      console.error("Error fetching merchant users:", error);
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

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      let data  = {
        userId:selectedUser.refferdCode
      }
      await axios.post("/api/deleteMerchant", {token: token,data });
      notify("User deleted successfully");
      fetchMerchantUsers(); // Refresh the user list
    } catch (error) {
      notifyError("Error deleting user");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
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
                <h2 className="dashboard-heading">Users List</h2>
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
                      <th>MobileNo</th>
                      <th>RefferedCode</th>
                      <th>RefferdBy</th>
                      <th>Amount</th>
                      <th>WinAmount</th> 
                      <th>BidAmount</th> 
                      <th>Action</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.mobileNo}</td>
                        <td>{user.refferdCode}</td>
                        <td>{user.refferedBy}</td>
                        <td>{user.amount !== null ? user.amount : 0}</td>
                        <td>{user.winAmount !== null ? user.winAmount : 0}</td>
                        <td>{user.bidAmount !== null ? user.bidAmount : 0}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteClick(user)}
                          >
                            Delete
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

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default MerchantList;
