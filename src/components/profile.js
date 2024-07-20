import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div>
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={userDetails.photo|| "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png"}
              width={"40%"}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <br></br>
          <h3>Welcome {userDetails.name} </h3>
          <div>
            <p>Email&nbsp;&nbsp;{userDetails.email}</p>
            <p>Name&nbsp;&nbsp;{userDetails.name}</p>
            {/* <p>Last Name: {userDetails.lastName}</p> */}
          </div>
          <br></br>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png"
              width="40%"
              style={{ borderRadius: "50%" }}
              alt="Default Profile"
            />
          </div>
          <br></br>
          <h3>Welcome Tharindu </h3>
          <div>
            <p>Email&nbsp;&nbsp;krishantkt@gmail.com</p>
            <p>Name&nbsp;&nbsp;Tharindu</p>
            {/* <p>Last Name: {userDetails.lastName}</p> */}
          </div>
          <br></br>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}
export default Profile;
