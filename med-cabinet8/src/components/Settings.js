import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axiosWithAuth from "../utils/axiosWithAuth";



export const Profile = () =>  {
const { push } = useHistory();
// eslint-disable-next-line
const [password, setPassword] = useState('');

const getData = () => {
  axiosWithAuth()
    .get("/profile")
    .then((res) => {
        console.log("ea: Recommendations.js getData results:", res.data);
;
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
          err.results
        )
      );
  };

  const changePassword = () => {
    const pWord = {"password": password}
    axiosWithAuth()
      .put("/profile/change-password", pWord)
      .then((res) => {
        localStorage.removeItem('token');
        localStorage.removeItem("login");
        push('/');
      })
      .catch((err) =>
        console.error(
          "ea: Profile.js: chg-password: err.message: ",
          err.results
        )
      );
  };

console.log(password, changePassword)
    return (
      <div>
        <p>TODO ADD form to change password</p>
        <button onClick={deleteUser}>Delete Profile</button>
      </div>
    );
  }


export default Profile;
