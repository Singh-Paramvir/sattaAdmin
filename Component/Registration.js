import axios from "axios";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!email || !password) {
      toast.error("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
    console.log(email,password,"before send");
    
      const { data } = await axios.post("/api/login", { email, password });
      console.log(data.data.data,"res here11111");
      localStorage.setItem("token",data.data.data);
      toast.success("Admin Login Successfully");
      router.push("/dashboard1");
    } catch (err) {
      toast.error("Invalid Email or Password");
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Sign In to Admin</h2>
        <form onSubmit={formSubmitHandler}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              style={styles.input}
              placeholder="Enter your email"
              ref={emailInputRef}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              style={styles.input}
              placeholder="6+ Characters, 1 Capital letter"
              ref={passwordInputRef}
              required
            />
          </div>
          <button
            type="submit"
            style={isLoading ? { ...styles.submitButton, ...styles.submitButtonDisabled } : styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    padding: "20px",
  },
  loginBox: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
  },

  inputGroup: {
    marginBottom: "16px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#374151",
    marginBottom: "4px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    fontSize: "14px",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#3d50e0",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s",
  },
  submitButtonDisabled: {
    backgroundColor: "#93c5fd",
  },
};

export default Login;
