"use client";
import { useState } from "react";
import { comparePassword, hashedPassword } from "./Hashing";

export default function Home() {
  const storedData = JSON.parse(localStorage.getItem("userInfo")) || undefined;

  const [data, setData] = useState({
    userName: "",
    password: "",
  });

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [display, setDisplay] = useState({
    home: true,
    register: false,
    login: false,
    feedBack: false,
    success: false,
    text: "",
    btn: false,
  });

  // functions

  const handleSIgnup = (event) => {
    event.preventDefault();
    setDisplay((prev) => ({
      ...prev,
      login: false,
      home: false,
      register: true,
      text: "",
    }));
  };
  const handleLogin = (event) => {
    event.preventDefault();
    setDisplay((prev) => ({
      ...prev,
      login: true,
      home: false,
      register: false,
      text: "",
    }));
  };

  async function signUpUser(username, password) {
    try {
      const hashed = await hashedPassword(password);
      data.userName = username;
      data.password = hashed;
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.error("Error signing up user:", error);
      throw new Error("Error signing up user");
    }
  }

  const handleRegister = (event) => {
    event.preventDefault();

    event.target.innerHTML = `
      <div class='loaderDiv'>
          <span class="loader"></span>
      </div>
       `;
    setDisplay((prev) => ({ ...prev, text: "" }));
    userData.userName.length;
    setTimeout(() => {
      if (
        userData.userName.length !== 0 &&
        userData.password.length !== 0 &&
        userData.confirmPassword.length !== 0
      ) {
        if (
          userData.confirmPassword === userData.password &&
          userData.userName.length >= 3 &&
          /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@"]).*$/.test(
            userData.password
          )
        ) {
          signUpUser(userData.userName, userData.password); //calling singUpUser function

          setDisplay((prev) => ({
            ...prev,
            register: false,
            success: true,
            text: "",
          }));
          setUserData({ userName: "", password: "", confirmPassword: "" });
        } else if (userData.userName.length < 3) {
          setDisplay((prev) => ({
            ...prev,
            text: "username must contain more than 3 letter",
          }));
        } else if (userData.confirmPassword !== userData.password) {
          setDisplay((prev) => ({
            ...prev,
            text: "both passwords does not match",
          }));
        } else if (
          !/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@"]).*$/.test(
            userData.password
          )
        ) {
          setDisplay((prev) => ({
            ...prev,
            text: "password must be 8 characters long, it must contain at least one uppercase letter, one lowercase letter, one number and one special character",
          }));
        }
      } else {
        setDisplay((prev) => ({ ...prev, text: "form must be filled" }));
      }
      event.target.innerHTML = `Register`;
    }, 2000);
  };

  async function signInUser(username, password) {
    try {
      const hashedPassword = storedData.password; // Get hashed password from localStorage
      const match = await comparePassword(password, hashedPassword);
      if (storedData.userName === username && match) {
        setDisplay((prev) => ({
          ...prev,
          text: "",
          btn: false,
        }));
        alert("logged in");
        setData({ userName: "", password: "" });
      } else {
        setDisplay((prev) => ({
          ...prev,
          text: "You entered Incorrect data, you can click the sign up button below to create an account with us",
          btn: true,
        }));
      }
    } catch (error) {
      console.error("Error signing in user:", error);
      throw new Error("Error signing in user");
    }
  }

  const handleLoginBtn = (e) => {
    e.preventDefault();
    storedData.length === 0 ? alert("hello") : console.log(storedData);
    e.target.innerHTML = `
     <div class='loaderDiv'>
      <span class="loader"></span>
    </div>
     `;
    setDisplay((prev) => ({ ...prev, text: "" }));
    setTimeout(() => {
      if (data.userName !== "" && data.password !== "") {
        if (storedData !== undefined) {
          signInUser(data.userName, data.password); //calling singInUser function
        } else {
          setDisplay((prev) => ({
            ...prev,
            text: "Account does not exist, click the sign up button below to create an account with us",
          }));
          setDisplay((prev) => ({ ...prev, btn: true }));
        }
      } else {
        setDisplay((prev) => ({
          ...prev,
          text: "form must be fill",
        }));
      }
      e.target.innerHTML = `Login`;
    }, 2000);
  };

  return (
    <main>
      {display.home && (
        <section className="home">
          <h1>Get Started</h1>
          <div>
            <button className="layer-one-btn login-btn" onClick={handleLogin}>
              Log in
            </button>
            <button className="layer-one-btn Sign-btn" onClick={handleSIgnup}>
              Sign Up
            </button>
          </div>
        </section>
      )}

      {display.register && (
        <section className="signup">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              value={userData.userName}
              className="username"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, userName: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Password"
              value={userData.password}
              className="password"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Comfirm Password"
              value={userData.confirmPassword}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="confirm-password"
            />
            <p className="feedBack">{display.text}</p>
            <button className="register-btn" onClick={handleRegister}>
              Register
            </button>
            <button className="login-btn" onClick={handleLogin}>
              Have account? Sign In
            </button>
          </form>
        </section>
      )}

      {display.login && (
        <section className="login">
          <svg
            width="34px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" backIcon"
            onClick={() => {
              setDisplay((prev) => ({ ...prev, login: false, home: true }));
            }}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                fill="#fff"
              ></path>{" "}
            </g>
          </svg>
          <h1>login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              className="log-username"
              value={data.userName}
              onChange={(e) =>
                setData((prev) => ({ ...prev, userName: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Password"
              className="log-password"
              value={data.password}
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <p className="feedBack">{display.text}</p>
            <button className="access" onClick={handleLoginBtn}>
              login
            </button>
            {display.btn && (
              <button className="show Sign-btn" onClick={handleSIgnup}>
                Sign Up
              </button>
            )}
          </form>
        </section>
      )}

      {display.success && (
        <section className="success">
          <svg
            width="95px"
            height="95px"
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#FFF"
            transform="matrix(1, 0, 0, 1, 0, 0)"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0">
              <rect
                x="-2.4"
                y="-2.4"
                width="28.80"
                height="28.80"
                rx="14.4"
                fill="#4cd655"
                strokeWidth="0"
              ></rect>
            </g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#fff"
                strokeWidth="1.128"
              ></circle>{" "}
              <path
                d="M8.5 12.5L10.5 14.5L15.5 9.5"
                stroke="#fff"
                strokWidth="1.128"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <p>Registration Successful, you can now log in</p>
          <button
            className="layer-one-btn login-btn"
            onClick={() => {
              setDisplay((prev) => ({ ...prev, success: false, login: true }));
              setData({ userName: "", password: "" });
            }}
          >
            ok
          </button>
        </section>
      )}
    </main>
  );
}
