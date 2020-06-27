import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import axiosWithAuth from "../utils/axiosWithAuth";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  gridContainer: {
    margin: "1rem 0",
  },
  ratingText: {
    verticalAlign: "top",
    marginRight: ".5rem",
  },
  rating: {
    textAlign: "center",
    margin: "1rem 0",
  },
  description: {
    marginBottom: "1rem",
  },
});

export default function Recommendations({ object }) {

  const classes = useStyles();
  const [recs, setRecs] = useState([]);
  const [error, setError] = useState("");
  const [prefs, setPrefs] = useState({
		"listName" : '',
	  });






  useEffect(() => {
    if (object){
      setPrefs({ "listName": object[0] ? object[0] : '',});
    }
    axiosWithAuth()
      .get(`/profile/recommendations/${prefs.listName}`)
      .then((res) => {
        console.log(res.data.recommendations, "data");
        setRecs(res.data.recommendations);
        setError("");
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.message);
      });
  }, [
    object, prefs.listName,
  ]);

  function renderStars(rating) {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<StarsIcon />);
    }
    if (rating === 0) {
      stars = (
        <Typography variant="subtitle1" color="initial">
          No Stars
        </Typography>
      );
    }
    return stars;
  }
  if (recs.length === 0 && error.length === 0) {
    return(
      <div>Loading</div>
    )
  }
  return (
    <Grid
      container
      spacing={3}
      className={classes.gridContainer}
      justify="space-evenly"
    > {error && <div>
        <p>No Recommendations Found</p>
        <p className="error">{error}</p>
      </div> }
      {recs &&
        recs.map((rec, index) => {
          return (
            <Grid
              item
              container
              wrap="wrap"
              key={index}
              xs={12}
              sm={6}
              md={4}
              alignItems="center"
            >
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Grid item>
                    <Typography variant="h5" component="h3" align="center">
                      {rec.Strain}
                    </Typography>
                    <Typography
                      className={classes.pos}
                      color="textSecondary"
                      align="center"
                    >
                      {rec.Type}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.rating}>
                    <Typography
                      variant="subtitle2"
                      color="initial"
                      display="inline"
                      className={classes.ratingText}
                    >
                      Rating:
                    </Typography>
                    {renderStars(rec.Rating)}
                  </Grid>
                  <Grid item className={classes.description}>
                    <Typography variant="body1" color="initial" align="justify">
                      {rec.Description}
                    </Typography>
                  </Grid>
                  <Grid item container justify="center">
                    <Grid item>
                      <ListSubheader>Effects:</ListSubheader>
                      <List dense>
                        {rec.Effects.split(",").map((effect, index) => {
                          return (
                            <ListItem key={index}>
                              <ListItemText>{effect}</ListItemText>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Grid>
                    <Grid item>
                      <ListSubheader>Flavors:</ListSubheader>
                      <List dense>
                        {rec.Flavor.split(",").map((flavor, index) => {
                          return (
                            <ListItem key={index}>
                              <ListItemText>{flavor}</ListItemText>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}
