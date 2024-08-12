import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const SideBar = () => {
  const router = useRouter();

  const [tokenData, setTokenData] = useState();
  const [avatar, setAvatar] = useState();
  const [faStatus, setFaStatus] = useState();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    // getUserStatus();
    // getAvatar();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    signOut({ callbackUrl: '/' });
  };

  return (
    <div>
      <div className={toggle ? "" : "toggle-sidebar"}>
        <button onClick={() => setToggle(!toggle)} className="btn primary bi bi-list toggle-sidebar" id="toggle-setting">
          <img id="arrow-id" src="/others/arws.webp" />
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

        {/* <!-- ======= Sidebar ======= --> */}
        <aside className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <a className="navbar-brand" href="/" id="href-set">
              <h2 id="coin-master-heading">ADMIN</h2>
              {/* <img id="logo-id" src="/navbar/white-logo.png"/> */}
            </a>
            {/* <div className="profile-menu"> */}
            {/* <img className="profileImage" id="profilePictureMenu" src={avatar} alt=""/>
              <div className="profile-info overflowHidden" title="">{tokenData?.firstName}</div></div> */}

            <li className="nav-item">
              <a className="collap" href="/allMerchant">
                {/* <img src="/others/dashboard.png"/> */}
                <i className="fa-regular fa-grid"></i>
                <span className="dash-texts">Merchant Data</span>
              </a>
            </li>
            {/* <!-- End Dashboard Nav --> */}

            <li className="nav-item">
              <ul id="components-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
                <li>
                  <a href="/allMerchant">
                    <i className="fa fa-circle"></i>
                    <span>Merchant list</span>
                  </a>
                </li>
                {faStatus ? (
                  <li>
                    <a>
                      <i className="fa fa-circle"></i>
                      <span>SECURITY</span>
                    </a>
                  </li>
                ) : (
                  <li>
                    {/* <a href="/2fa">
                       <i className="fa fa-circle"></i>
                       <span>SECURITY</span>
                     </a> */}
                  </li>
                )}
              </ul>
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
            {/* <!-- End Components Nav --> */}
          </ul>
        </aside>
        {/* <!-- End Sidebar--> */}
      </div>
    </div>
  );
};

export default SideBar;