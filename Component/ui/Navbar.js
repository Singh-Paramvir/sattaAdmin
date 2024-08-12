import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [isNightMode, setIsNightMode] = useState(false);
  const router = useRouter();
  const refCode = router.query;

  useEffect(() => {
    if (session) {
      // getUserStatus();
    }
  }, []);

  function logoutHandler() {
    signOut('/login');
    router.push('/login');
    window.localStorage.clear();
  }

  function toggleNightMode() {
    setIsNightMode(!isNightMode);
    document.body.classList.toggle('night-mode', !isNightMode);
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg top-nav" style={{ backgroundColor: "#343a40", width: "100%", padding: "10px 20px" }}>
          <div className="container-fluid d-flex justify-content-between align-items-center" id="fluid-set">
            <div className="d-flex align-items-center">
             
            </div>
            <div className="d-flex align-items-center">
              {/* <a href="#" className="nav-link" style={{ marginLeft: "20px" }}>
                <i className={`fa ${isNightMode ? 'fa-sun' : 'fa-moon'}`}></i>
              </a> */}
              <a href="#" className="nav-link" style={{ marginRight: "10px" }}>
                <i className="fa-regular fa-bell" style={{ fontSize: "18px" }}></i>
              </a>
              <a href="#" className="nav-link" style={{ marginRight: "10px" }}>
                <i className="fa-regular fa-circle-question" style={{ fontSize: "18px" }}></i>
              </a>
             
            </div>
          </div>
        </nav>
      </header>
      <style jsx>{`
        .night-mode {
          background-color: #2c2c2c;
          color: white;
        }
      `}</style>
    </>
  );
};

export default Navbar;
