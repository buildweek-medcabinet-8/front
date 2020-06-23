import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

class Profile extends React.Component {
  state = {
    message: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get("/profile")
      .then((res) => {
        //  console.log("ea: Recommendations.js getData results:", res.data);
        this.setState({
          message: res.data.message,
        });
      })
      .catch((err) =>
        console.error(
          "ea: Profile.js: getData: err.message: ",
          err.message
        )
      );
  };
  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <button>Delete Profile</button>
      </div>
    );
  }
}

export default Profile;
