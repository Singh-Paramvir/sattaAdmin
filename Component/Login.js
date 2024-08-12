import axios from "axios";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { signIn } from "next-auth/react";
import { Alert } from "react-bootstrap";

const Login = () => {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRef, setLoadingRef] = useState(false);

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    try {
      setLoadingRef(false);
      setIsLoading(false);

      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;

      localStorage.setItem("email", email);

      localStorage.getItem("email");

      if (!email) {
        toast.error("Please enter Email  !!");
        return;
      }

      if (!email.includes(".com")) {
        toast.error("Invalid email address!");
        setLoadingRef(false);
        setIsLoading(false);
        return;
      }

      if (!password) {
        toast.error("Please enter password");
      }

        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
         
        });
        console.log(res);
        if (res?.error) {
          console.log(res.error);
          setVerify(true);
          toast.error("Invalid Password.");
          setLoadingRef(false);
          setIsLoading(false);
        }
        if (!res.error) {
          console.log(res, "to get the response from api");
          toast.success("User loggedIn successfully...");

          setLoadingRef(true);
          setIsLoading(true);
          setVerify(false);

          setTimeout(() => {
            router.push("/allMerchant");
          }, 2000);
        }
    
      // getUserDetail();
    } catch (err) {
      toast.error("Invalid Email");
    }
  }

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoadingRef(true);
        window.location.reload("/allMerchant");
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoadingRef(false);

  /////////////Toast//////////////////////
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
    <div>
      <section className="profile-sec ">
        <div className="container">
          <div className="row justify-content-center">
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
            <form
              className="input-sec input-top p-0"
              id="bar-top"
              onSubmit={formSubmitHandler}
            >
              <div className="input-line iptset-line" id="index-line"></div>
              <div className="p-3">
                <h3 className="heading-text mt-3">  LOGIN</h3>
                <p
                  style={{
                    fontSize: "13px",
                    paddingTop: "7px",
                    margin: "0",
                    color: "white",
                  }}
                >
                  {" "}
                  Buy and Join our global Community.
                </p>

                <div className="input-item">
                  <h6 className="item-text">EMAIL</h6>
                  <input
                    className="textinput"
                    type="email"
                    name="username"
                    ref={emailInputRef}
                    autoComplete="on"
                  />
                </div>

                <div
                  className="input-item"
                  style={{ marginTop: "25px", marginBottom: "10px" }}
                >
                  <h6 className="item-text">PASSWORD</h6>
                  <input
                    className="textinput"
                    type="password"
                    name="last-name"
                    ref={passwordInputRef}
                    autoComplete="on"
                  />
                </div>
                <div
                  style={{
                    color: "white",
                    marginBottom: "35px",
                    textAlign: "left",
                    fontSize: "14px",
                  }}
                >
                  Your password must be at least 8 characters long, should
                  contain at least one number and special character have a
                  mixture of uppercase and lowercase letters.
                </div>
                {/* {error && (
                  <p style={{ color: "red", margin: "0", fontSize: "15px" }}>
                    {" "}
                    User doesn't Exist. Please try again or signup below.{" "}
                  </p>
                )}
                {verify && (
                  <p style={{ color: "green", margin: "0", fontSize: "15px" }}>
                    {" "}
                    LoggedIn Successfully.{" "}
                  </p>
                )} */}

                <Button
                  variant="primary"
                  className="btn btn-round btn-warning w-100 p-0 "
                  style={{ marginTop: "5px" }}
                  type="submit"
                  disabled={isLoading}
                  onClick={!isLoading ? handleClick : null}
                >
                  {isLoadingRef ? "Loading…" : "   LOGIN"}
                </Button>

                <p className="by-text mb-0">
                  {" "}
                  By continuing you agree to our cookie policy.
                </p>
                <Link href={"/emailVerify"}>
                  <p
                    className="by-text"
                    style={{
                      cursor: "pointer",
                      marginTop: "5px",
                      fontSize: "13px",
                      color: "#04031c !important",
                    }}
                  >
                    {" "}
                    Forgot your password?
                  </p>
                </Link>
              </div>
              <div className="para-set ">
                <Link href={"/"}>
                  <p className="iptpara-text">
                    Are you new here?{" "}
                    <a
                      href="home-page.html"
                      style={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "#fff",
                      }}
                    >
                      Sign Up
                    </a>
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
