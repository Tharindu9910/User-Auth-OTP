import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import PhoneSignup from "./phoneSignup";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in Successfully");
            window.location.href = "/profile";
            toast.success("User logged in Successfully", {
                position: "top-center",
            });
        } catch (error) {
            console.log(error.message);

            toast.error(error.message, {
                position: "bottom-center",
            });
        }
    };
    const gotToNewPage = () => {
        navigate("/phonesignup");
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>

                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
                <p className="new-user">
                    New user <a href="/register">Register Here</a>
                </p>
                <SignInwithGoogle />
                <div className="item-container">
                    <div className="item-center" >
                        <button className="btn-phone" onClick={() => gotToNewPage()} >
                            Phone
                        </button>
                    </div>
                </div>

            </form>

        </>


    );
}

export default Login;
