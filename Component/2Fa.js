import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";

export default function ScanQR() {
  const [base32, setBase32] = useState();
  const [qrGenerated, setQrGenerated] = useState(false);
  const [scanner, setScanner] = useState();

  async function qrData() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/2fa", { token: token });
      const response = res.data;
      setScanner(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Something Went wrong to generate the Qr Code");
    }
  }

  useEffect(() => {
    qrData();
  }, []);

  return (
    <div className='new-dashboard'>
      <SideBar/>
    <div id="qrScanner">
      <form className="profile-sec profile-sectset">
        <div className="container">
        <Navbar/>
        <div className="scanQR-heading--div">
          <h1 className="scanQR-heading">Two Factor Authentication</h1>
        </div>
        </div>

        <section className="sec-fa">
          <div className="container">
            <div className="row justify-content-center">
              <div className="mail-sec">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      <div className=" first-item">
                        <div className="part-head">
                          <div className="left-part" id="scan-QR-code">
                            <div className="check">
                              <span className="number number-1">1</span>
                            </div>

                            <div className="email-text">
                              <h6 className="scaning-text">Scan QR Code</h6>
                            </div>
                          </div>
                          <div className="right-part"></div>
                        </div>
                      </div>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      <div className="col-md-4 second-item">
                        <div className="part-head">
                          <div className="left-part">
                            <div className="check">
                              <span className="number ">2</span>
                            </div>
                            <div className="email-text mt-2">
                              <h6>Verify</h6>
                            </div>
                          </div>

                          <div className="right-part"></div>
                        </div>
                      </div>
                    </button>
                  </li>
                  <li className="nav-item third-part" role="presentation">
                    <button
                      className="nav-link third-content"
                      id="contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#contact"
                      type="button"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                    >
                      <div className="col-md-4 third-item">
                        <div className="part-head">
                          <div className="left-part">
                            <div className="check">
                              <span className="number number-3">3</span>
                            </div>
                            <div className="email-text mt-2">
                              <h6>COMPLETE</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="scanQR-content">
          <h2 className="scanQR-secondary--heading">
            Scan this QR code in the <br /> Authenticator App
          </h2>
          <div className="scan-img">
            <img src={scanner?.qrData} className="qr" />
          </div>
          <div
            className="para-set"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "24px",
              border: "none",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <p
              className="iptpara-text"
              style={{
                fontSize: "14px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                color:"black",
                wordBreak: "break-all"
              }}
            >
              {scanner?.base}
              <CopyToClipboard
                text={scanner?.base}
                onCopy={() => notify("Copied Successfully")}
              >
                <img src="/others/mdi.png" style={{ marginLeft: "10px" }} />
              </CopyToClipboard>
            </p>
          </div>
          <span className="scan-text">
            If you are unable to scan the QR code, please enter this code
            <br /> manually into the app
          </span>
          <div className="scan-div">
            <Link href="/2faVerifyCode">
              <button type="button" className="scan-next">
                Next
              </button>
            </Link>
          </div>
        </div>
        {/* <div className="scan-copyrightText">
        <p className="scan-copyrightText--1">
          2017 - 2022 Binance.com All rights reserved
        </p>
        <p className="scan-copyrightText--2">Cookie Preferences</p>
      </div> */}
      </form>
    </div>
    </div>
  );
}
