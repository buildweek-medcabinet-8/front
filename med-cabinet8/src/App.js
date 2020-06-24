import React, { useState, useEffect } from "react";
import "./App.css";
//import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, makeStyles } from "@material-ui/core";
import { Container } from "@material-ui/core";
import theme from "./theme";
import Loading from "./components/LoadingPage"
import LoginForm from "./components/Login";
import Preferences from "./components/Preferences";
import Registration from "./components/Registration";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import Recommendations from "./components/Recommendations";
import Navbar from "./components/Navbar";
import StrainSearch from "./components/StrainSearch";
import bgImage from "./img/splash.jpg"

function App() {

  const [checked, setChecked] = useState(Boolean(localStorage.getItem("login")) ?? false);
  const [displayStatus, setDisplayStatus] = useState({
    visibility: "hidden",
    opacity: 0,
  });

  function showImage() {
    //alter state var for new css display rule
    setDisplayStatus({
      visibility: "visible",
      opacity: 1,
    });
  }
  useEffect(() => {
    showImage();
  }, []);

  const useStyles = makeStyles({
    app: {
      //darkmode
      // backgroundColor: "#222",
      // backgroundBlendMode: "multiply",
      
      backgroundColor: "#ddd",
      backgroundBlendMode: "screen",
      backgroundImage:
        ` url(${bgImage})`,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",

      height: "200vh",
      width: "100vw",
  
    }

  });
  const classes = useStyles();

  if (displayStatus.visibility === "hidden") {
  return(<Loading />)
}


  return (
    <Router>

      <ThemeProvider theme={theme}>
        <div className={classes.app} style={{
            visibility: displayStatus.visibility,
            opacity: displayStatus.opacity,
           }}>
          <Container>
            <Navbar checked={checked} setChecked={setChecked} />

            {/* <Route exact path='/' component={LoginForm} /> */}
            <Route exact path="/">
              <LoginForm setChecked={setChecked} />
            </Route>
            <Route path="/register" component={Registration} />
            <PrivateRoute path="/med-cabinet" component={StrainSearch} />
            <PrivateRoute path="/settings" component={Preferences} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/recommendations" component={Recommendations} />

          </Container>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
