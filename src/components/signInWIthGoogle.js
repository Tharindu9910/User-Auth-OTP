import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import React from "react";

function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          time:Timestamp.now()
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        window.location.href = "/profile";
      }
    });
  }
  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img alt="SignIn With Google"src={require(
// @ts-ignore
        "../assets/google.png")} width={"60%"} />
      </div>
    </div>
  );
}
export default SignInwithGoogle;
