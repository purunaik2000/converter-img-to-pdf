import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Alert from "../components/Alert";
import "./Home.css";

export default function Home() {
  const [alert, setAlert] = useState("");
  const [user, setUser] = useState({});
  const [image, setImage] = useState('');

  const url = "http://localhost:3000/dev/images/upload";

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  let formData;
  function setImages(e) {
    formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append(`image[${i}]`, e.target.files[i]);
    }
    console.log(formData);
  }

  async function upload() {
    setAlert("wait...");
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((val) => {
        console.log("Success:", val);
        if(val.status) setImage(val.data.images)
        setAlert(val.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    
  return (
    <div className="Home container">
      {!user && <Navigate to="/login" replace={true} />}
      <h1>Images to PDF converter</h1>
      <div className="upload">
        <input
          accept="image/*"
          onChange={(e) => setImages(e)}
          type="file"
          multiple
        />
        <div className="button">
          <div className="btn" onClick={upload}>Upload</div>
        </div>
      </div>
      {alert && <Alert msg={alert} set={setAlert} />}
    </div >
  );
}