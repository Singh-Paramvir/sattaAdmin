import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import Link from "next/link";
import { faL } from "@fortawesome/free-solid-svg-icons";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";
// import { check } from "./CommonFunctions/common";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 4000));
}

const Register = () => {
  const emailInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const referralCodeInputRef = useRef();
  const passwordInputRef = useRef();
  // const uplineIdInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [passwordError,setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [value, setValue] = useState(false);
  const [postionError, setPositionError] = useState(false);
  const router = useRouter();
  console.log(router.query)
  async function registrationPage(data) {
    try {
      let res = await axios.post("/api/registration", data);
      const response = res.data;
      console.log(response,'to check the response')
      toast.success("User Registered Successfully");
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      setIsPassword(false);
      setPositionError(false);
      setPasswordError(false);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.log(err,'error');
        
       const errorMsg = err.response.data.error.status;
        if(errorMsg == '400'){
          toast.error('User already exist')
          setError(true);
          setVerify(false);
          setIsLoading(false);
          setLoadingRef(false);
          setIsPassword(false);
          setPositionError(false);
          setPasswordError(false);
          return;
        }

        if(errorMsg == '402') {
          toast.error('Invalid Referral Code')
          setError(false);
          setVerify(false);
          setIsLoading(false);
          setLoadingRef(false);
          setIsPassword(false);
          setPositionError(false);
          setPasswordError(false);
          return;
        }
       
      
     
    }
  }

  function formSubmitHandler(event) {
    event.preventDefault();

    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const email = emailInputRef.current.value;
    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const password = passwordInputRef.current.value;
    const referralCode = referralCodeInputRef.current.value;
    const position = value;


    if (!email || !firstName || !lastName || !password || !referralCode) {
      toast.error("Please Provide all the credentials");
      return;
    }

    if (!email.includes(".com")) {
      toast.error("Please provide valid email Address");
      setPositionError(false);
      return;
    }

  

    if (referralCode.trim().length < 6) {
      toast.error("Referral Code Must of Six Digit");
      return;
    }

    if (!position) {
      toast.error("Please select the postion to continue");
      setPositionError(true);
      return;
    }

    const data = {
      email,
      firstName,
      lastName,
      password,
      referralCode,
      position,
      // uplineId,
    };

    if (!regularExpression.test(password)) {
      setIsPassword(true);
      setPasswordError(true);
      setLoadingRef(false);
      setIsLoading(false);
      setPositionError(false);
      toast.error('Passowrd must contain 8 characters (one uppercase and lowercase letter and number are required.')
      return false;
    }

    registrationPage(data);
    setIsLoading(true);
    setLoadingRef(true);
  }

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoadingRef(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoadingRef(false);

  function onChangeEvent(event) {
    setValue(event.currentTarget.value);
  }

  return (
    <div className='new-dashboard'>
    <SideBar/>
      <section className="profile-sec profile-sects">
        <div className="container">
          <div className="row justify-content-center">
            <Navbar/>
            <ToastContainer />
            <form
              className="input-sec input-top p-0 "
              id="form-setup"
              onSubmit={formSubmitHandler}
            >
              <div className="input-line" id="index-line"></div>

              <div className="padding-set">
                {/* <h3 className="heading-text mt-4">
                  {" "}
                  Join the Global Community
                </h3> */}
                <img className="stier-logo"  src="/navbar/white-logo.png"></img>

                <div className="input-item">
                  <h6 className="item-text"> EMAIL</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0 "
                    id="mb-set"
                  >
                    <input
                      ref={emailInputRef}
                      type="email"
                      className="form-control form-border"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>

                <div className="input-item" style={{ marginTop: "50px" }}>
                  <h6 className="item-text"> First Name</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0 "
                    id="mb-set"
                  >
                    <input
                      ref={firstNameInputRef}
                      type="text"
                      className="form-control form-border"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>

                <div className="input-item" style={{ marginTop: "50px" }}>
                  <h6 className="item-text">Last Name</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0"
                    id="mb-set"
                  >
                    <input
                      ref={lastNameInputRef}
                      type="text"
                      className="form-control form-border"
                      autoComplete="none"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>

                <div className="input-item" style={{ marginTop: "50px" }}>
                  <h6 className="item-text">Password</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0"
                    id="mb-set"
                  >
                    <input
                      ref={passwordInputRef}
                      type="password"
                      className="form-control form-border"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                    
                  </div>

                  <div>
                      Your password must be at least 8 characters long, should
                      contain at least one number and special character have a
                      mixture of uppercase and lowercase letters.
                    </div>
                  
                </div>

                <div className="input-item" style={{ marginTop: "50px" }}>
                  <h6 className="item-text">Referral Code</h6>
                  <div
                    className="input-group height-set flex-nowrap mt-0"
                    id="mb-set"
                  >
                    <input
                      ref={referralCodeInputRef}
                      type="text"
                      defaultValue={router?.query?.leftRef|| router?.query?.rightRef}
                      className="form-control form-border"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>

                <div className="input-item mb-4" style={{ marginTop: "50px" }}>
                  <h6 className="item-text">Position</h6>
                  <div className="forminput   mt-0 " id="mb-set">
                    <div value="L" className="form-check check-style">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="L"
                       checked={router?.query?.leftRef}
                        onChange={(event) => onChangeEvent(event)}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault1"
                      >
                        Left
                      </label>
                    </div>
                    <div className="form-check check-style">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value="R"
                        checked={router?.query?.rightRef}
                        onChange={(event) => onChangeEvent(event)}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault2"
                      >
                        Right
                      </label>
                    </div>
                  </div>
                </div>

                {error && (
                  <p style={{ color: "red", fontSize: "15px", margin: "0" }}>
                    {" "}
                    This email exists already. Login below.{" "}
                  </p>
                )}
                {verify && (
                  <p
                    style={{
                      color: "green",
                      fontSize: "15px",
                      marginTop: "20px",
                    }}
                  >
                    Check your email inbox for the verification code.{" "}
                  </p>
                )}
                {postionError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "15px",
                      marginTop: "20px",
                    }}
                  >
                    {" "}
                    Please select the position first to continue{" "}
                  </p>
                )}


                
                <Button
                  variant="primary"
                  className="btn btn-round btn-warning w-100 p-0 "
                  style={{ marginTop: "10px" }}
                  type="submit"
                  disabled={isLoading}
                  onClick={!isLoading ? handleClick : null}
                >
                  {loadingRef ? "Loading…" : "   REGISTER"}
                </Button>

                <p className="by-text">
                  {" "}
                  By continuing you agree to our privacy policy.
                </p>
              </div>
              {/* <div className="para-set">
                <Link href={"/login"}>
                  <p className="iptpara-text">
                    Already a Member?{" "}
                    <a
                      href="/login"
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        color: "#fff",
                      }}
                    >
                      {" "}
                      Login
                    </a>
                  </p>
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register