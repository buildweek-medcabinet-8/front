import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axiosWithAuth from "../utils/axiosWithAuth";



export const Profile = () =>  {
const { push } = useHistory();
const [message, setMessage] = useState('');

const getData = () => {
  axiosWithAuth()
    .get("/profile")
    .then((res) => {
      //  console.log("ea: Recommendations.js getData results:", res.data);
      setMessage(
        res.data.message,
      );
    })
    .catch((err) =>
      console.error(
        "ea: Profile.js: getData: err.message: ",
        err.message
      )
    );
};

useEffect(()=>{
  getData()
},[])

  

  const deleteUser = () => {
    axiosWithAuth()
      .delete("/profile/delete-user")
      .then((res) => {
        console.log(res.data)
        localStorage.removeItem('token');
        localStorage.removeItem("login");
        push('/');
      })
      .catch((err) =>
        console.error(
          "ea: Profile.js: delete-user: err.message: ",
          err.message
        )
      );
  };


    return (
      <div>
        <p>{message}</p>
        <button onClick={deleteUser}>Delete Profile</button>

      </div>
    );
  }


export default Profile;
