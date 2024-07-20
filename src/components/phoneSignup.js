import React, { useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { BsFillShieldLockFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import { auth } from "../utils/firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import "./phoneSignUp.css";
import { useNavigate } from "react-router-dom";

const PhoneSignUp = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  function onCaptchaVerify() {
    if (!window.RecaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  function onSignup(event) {
    event.preventDefault();
    setLoading(true);
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = "+" + ph;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        toast.success("OTP Sended Sucessfully");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  }

  function onOtpverify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user;
        setUser(user);
        setLoading(false);
        navigate('/profile'); 
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  }

  return (
    <div className={`d-flex justify-content-center`}>
      <Toaster toastOptions={{ duration: 4000 }} />
      {!user ? (
        <div className={`row position-absolute mt-5  `}>
          <div className="signuppage mt-5 bg-dark text-white p-5 ">
            {showOtp ? (
              <div className="optvarificationcontent">
                <span className="d-flex justify-content-center">
                <div className= "container"><span className= "circle">
                <BsFillShieldLockFill size={50} />
                  </span>
                  </div>
                  
                </span>
                <h6 className="text-center">Enter Your OTP </h6>
                <div className="item-container">
                    <div className="item-center" >
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  shouldAutoFocus
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                      }}
                    />
                  )}
                ></OtpInput>
                 </div>
                 </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary mt-3 w-75 "
                    onClick={onOtpverify}
                  >
                    {loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        style={{ marginRight: "10px" }}
                      ></span>
                    )}
                    <span> Verify OTP</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="d-flex justify-content-center">
                  <div className= "container"><span className= "circle">
                  <BiSolidPhoneCall size={50} />
                  </span>
                  </div>
              
                </span>
                <h6 className="text-center">Add your phone number. We'll send you a verification code</h6>
                <div className="item-container">
                    <div className="item-center" >
                <PhoneInput 
                  country={"lk"}
                  value={ph}
                  onChange={setPh}
                ></PhoneInput>
                </div>
                </div>
                <br></br>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary mt-3 w-75 "
                    onClick={onSignup}
                  >
                    {loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        style={{ marginRight: "10px" }}
                      ></span>
                    )}
                    
                    <span>Send OTP</span>
                  </button>
                </div>
                <div id="recaptcha-container" className="mt-6"></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className=" row position-absolute  text-white p-5">
          <p style={{ marginTop: "70%" }}>Login Sucessfully</p>
        </div>
      )}
    </div>
  );
};

export default PhoneSignUp;







// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "react-intl-tel-input/dist/main.css";
// import IntlTelInput from "react-intl-tel-input";
// import { Button } from "react-bootstrap";
// import { auth } from "./firebase.js";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { toast, Toaster } from "react-hot-toast";
// import "./phoneSignUp.css";

// const PhoneSignUp = () => {
//   const [otp, setOtp] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);
//   const [user, setUser] = useState(null);
//   // const handlePhoneChange = (isValid, value, countryData, number, id) => {
//   //   setPhone(value);
//   // };
//   const onCaptchVerify = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: () => {
//             onSignup(); // Recaptcha solved, continue with sign-in
//           },
//           "expired-callback": () => {},
//         },
//         auth
//       );
//     }
//   };

//   const onSignup = () => {
//     setLoading(true);
//     onCaptchVerify();

//     const appVerifier = window.recaptchaVerifier;

//     signInWithPhoneNumber(auth, phone, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOTP(true);
//         toast.success("OTP sent successfully!");
//       })
//       .catch((error) => {
//         console.error("Error during signInWithPhoneNumber:", error);
//         setLoading(false);
//         toast.error(error.message);
//       });
//   };

//   const onOTPVerify = () => {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then((res) => {
//         console.log("User verified:", res.user);
//         setUser(res.user);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error during OTP verification:", err);
//         setLoading(false);
//         toast.error(err.message);
//       });
//   };

//   return (
//     <div className="container">
//       <div className="auth-box">
//       <Toaster toastOptions={{ duration: 4000 }} />
//       <div id="recaptcha-container"></div>
//       {user ? (
//         <h2 className="auth-title">👍 Login Success</h2>
//       ) : (
//         <>
//           <h2 className="auth-title">Firebase Phone Auth</h2>
//           {showOTP ? (
//             <>
//               <label htmlFor="otp" className="otp-label">
//                 Enter your OTP
//               </label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="otp-input"
//               />
//               <Button
//                 className="verify-button"
//                 onClick={onOTPVerify}
//                 variant="primary"
//               >
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </Button>
//             </>
//           ) : (
//             <>
//               {/* <IntlTelInput
//                 preferredCountries={['lk']}
//                 containerClassName="intl-tel-input"
//                 inputClassName="form-control"
//                 onPhoneNumberChange={handlePhoneChange}
//               /> */}
//               <input
//           type="phone"
//           className="form-control"
//           placeholder="Enter phone"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//               <label>{phone}</label>
//               <Button
//                 className="verify-button"
//                 onClick={onSignup}
//                 variant="primary"
//               >
//                 {loading ? "Sending..." : "Send OTP"}
//               </Button>
//             </>
//           )}
//         </>
//       )}
//       </div>
//       </div>
//   );
// };

// export default PhoneSignUp;
