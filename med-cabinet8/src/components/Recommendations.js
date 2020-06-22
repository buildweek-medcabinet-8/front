import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

class Recommendations extends React.Component {
  state = {
    recommendationList: [],
    message: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get("/profile/recommendations")
      .then((res) => {
        //  console.log("ea: Recommendations.js getData results:", res.data);
        this.setState({
          recommendationList: res.data.content,
          message: res.data.message,
        });
      })
      .catch((err) =>
        console.error(
          "ea: Recommendations.js: getData: err.message: ",
          err.message
        )
      );
  };
  render() {
    return (
      <div>
        <ul>
          <li> {this.state.recommendationList.yourName}</li>
          <li>{this.state.recommendationList.Strain}</li>
          <li>{this.state.recommendationList.rating}</li>
          <li>{this.state.recommendationList.type}</li>
          <li>{this.state.message}</li>
        </ul>
      </div>
    );
  }
}

export default Recommendations;
