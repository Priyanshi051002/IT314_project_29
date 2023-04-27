import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Grid,
  Container,
  Box,
} from "@mui/material";
import Navbar from "../../components/Navbar";

import PostCard from "./PostCard";
import ProfileCard from "./ProfileCard";


const Profile = () => {
  const [profile, setProfile] = useState("");
  const [posts, setPosts] = useState([]);
  // const [temp, setTemp] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response1 = await fetch(`http://localhost:5000/user/getProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data1 = await response1.json();
        console.log(data1.data);

        const response2 = await fetch(
          `http://localhost:7000/post/getPostsUser`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ user_id: data1.data.user.username }),
          }
        );
        const data2 = await response2.json();

        if(data1.success){
          setProfile(data1.data);
        }
        if(data2){
          setPosts(data2);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Navbar />
          <Grid container xs={12} sm={12} md={12} rowSpacing={2}>
            <Grid item xs={12}>
              {/* {console.log(profile)} */}
              {profile && <ProfileCard profileData={profile} />}
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    About
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {profile.about}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <PostCard posts={posts} user={profile.user}/>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
