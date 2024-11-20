import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const SideBar = () => {
  const [toggle, setToggle] = useState(false);
  const [editPanelOpen, setEditPanelOpen] = useState(true); // Set to true to expand by default
  const [winListOpen, setWinListOpen] = useState(true); // Set to true to expand by default

  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    signOut({ callbackUrl: '/' });
  };

  const handleEditPanelClick = () => {
    setEditPanelOpen(!editPanelOpen);
  };

  const handleWinListClick = () => {
    setWinListOpen(!winListOpen);
  };

  return (
    <div>
      <div className={toggle ? "" : "toggle-sidebar"}>
        <button onClick={() => setToggle(!toggle)} className="btn primary bi bi-list toggle-sidebar" id="toggle-setting">
        <img 
            id="arrow-id" 
            src="arws.webp" 
            alt="Menu"
            style={{ width: "30px", height: "30px" }} 
          />
        </button>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <aside className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <a className="navbar-brand"  id="href-set">
              <h2 id="coin-master-heading">ADMIN</h2>
            </a>

            {/* Edit Panel */}
            <li className="nav-item">
              <a 
                className="collap" 
                onClick={handleEditPanelClick} 
                style={{ cursor: "pointer" }}
              >
                <i className="fa-regular fa-grid"></i>
                <span className="dash-texts">#Edit Panel</span>
              </a>
              {editPanelOpen && (
                <ul id="edit-panel-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
                  <li>
                    <a href="/dashboard1">
                      <i className="fa fa-circle"></i>
                      <span>Slots list</span>
                    </a>
                    <a href="/allUsers">
                      <i className="fa fa-circle"></i>
                      <span>Users list</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Win List */}
            <li className="nav-item">
              <a 
                className="collap" 
                onClick={handleWinListClick} 
                style={{ cursor: "pointer" }}
              >
                <i className="fa-regular fa-grid"></i>
                <span className="dash-texts">#Dashboard</span>
              </a>
              {winListOpen && (
                <ul id="win-list-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
                  <li>
                    <a href="/faridabaad">
                      <i className="fa fa-circle"></i>
                      <span>Faridabad</span>
                    </a>
                    <a href="/gajiyabad">
                      <i className="fa fa-circle"></i>
                      <span>Gajiyabad</span>
                    </a>  
                    <a href="/agra">
                      <i className="fa fa-circle"></i>
                      <span>Gali.(ND/Agra)</span>
                    </a> 
                    <a href="/disawer">
                      <i className="fa fa-circle"></i>
                      <span>Disawer (DS/PD)</span>
                    </a>                
                  </li>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <ul id="incentive-nav" className="nav-content collapse show" data-bs-parent="#incentive-nav"></ul>
            </li>

            <li className="nav-item"></li>

            <li className="nav-item">
              <a className="nav-link" href="/" onClick={handleLogout}>
                <span className="spanic">Logout</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default SideBar;
