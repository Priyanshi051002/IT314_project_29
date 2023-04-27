import { React, useEffect, useState } from "react";
import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Container,
  Box,
  Divider,
} from "@mui/material";

// import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ImageUrl from "../../static";

const Connect = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(12);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_MONGO}/user/getAllUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setUsers(data.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const ShowMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const handleFollow = (username) => {
    // console.log("Follow");
    fetch(`${process.env.REACT_APP_MONGO}/user/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ username: username }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert(
            "Followed. Navigate to Following and Followers Page to see the results"
          );
        } else {
          alert(
            "Unfollwed. Navigate to Following and Followers Page to see the results"
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Navbar />
          <Typography
            variant="h4"
            textAlign={"center"}
            component="div"
            gutterBottom
            mt={2}
          >
            Connect With Others
          </Typography>
          <Divider />
          <Grid container rowSpacing={3} columnSpacing={4} mt={0.5} mb={2}>
            {users.slice(0, visible).map((user) => (
              <Grid item xs={12} sm={6} md={3}>
                {/* Can be modified to reduce redundancy */}
                <Card key={user.username}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="125"
                    image={ImageUrl}
                  />
                  <CardContent>
                    <Typography variant="h5" textAlign={"left"} component="div">
                      {user.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ borderRadius: "16px" }}
                      fullWidth
                      color="info"
                      variant="outlined"
                      onClick={() => handleFollow(user.username)}
                    >
                      Connect
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box mt={2} mb={2}>
            <Button
              size="large"
              color="success"
              fullWidth
              onClick={ShowMoreItems}
            >
              Load more
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Connect;
