import React from "react";
import {
//   Card,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
//   CardMedia,
//   Grid,
  Container,
//   Box,
} from "@mui/material";
// import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

// const DUMMY_DATA = [
//   {
//     name: "Om",
//     source: "https://source.unsplash.com/random",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   },
//   // {
//   //   name: "Harsh",
//   //   source: "https://source.unsplash.com/random",
//   //   description:
//   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   // },
//   // {
//   //   name: "Priyanshi",
//   //   source: "https://source.unsplash.com/random",
//   //   description:
//   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   // },
//   // {
//   //   name: "Kaushal",
//   //   source: "https://source.unsplash.com/random",
//   //   description:
//   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   // },
//   // {
//   //   name: "Devdeep",
//   //   source: "https://source.unsplash.com/random",
//   //   description:
//   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   // },
//   // {
//   //   name: "Achyut",
//   //   source: "https://source.unsplash.com/random",
//   //   description:
//   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   // },
// ];

// const postCard = (
//   <React.Fragment>
//     <Card>
//       <CardContent>
//         <Typography variant="h5" component="div" gutterBottom>
//           My Posts
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={6}>
//             <PostCards items={DUMMY_DATA} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={6}>
//             <PostCards items={DUMMY_DATA} />
//           </Grid>
//         </Grid>
//       </CardContent>
//       <CardActions>
//         <Button
//           variant="contained"
//           component={Link}
//           to="/myposts"
//           fullWidth
//           color="success"
//         >
//           Show All Posts
//         </Button>
//       </CardActions>
//     </Card>
//   </React.Fragment>
// );

// const profileCard = (
//   <React.Fragment>
//     <Card>
//       <CardMedia
//         component="img"
//         height="250"
//         image={PROFILE_DATA.bg_image}
//       ></CardMedia>

//       <Grid container>
//         <Grid item xs={12} sm={5} md={4} py={3}>
//           <CardMedia
//             component="img"
//             image={PROFILE_DATA.prf_image}
//             sx={{
//               margin: "auto",
//               width: "200px",
//               height: "200px",
//               borderRadius: "50%",
//               maxWidth: "100%",
//             }}
//           ></CardMedia>
//         </Grid>
//         <Grid item xs={12} sm={7} md={8}>
//           <CardContent>
//             <Grid container>
//               <Grid item xs={8} sm={8} md={8}>
//                 <Typography variant="h4" component="div" gutterBottom>
//                   {PROFILE_DATA.name}
//                 </Typography>
//               </Grid>
//               <Grid item xs={2} sm={2} md={2}>
//                 <Typography variant="h6" component="div" gutterBottom>
//                   120
//                 </Typography>
//               </Grid>
//               <Grid item xs={2} sm={2} md={2}>
//                 <Typography variant="h6" component="div" gutterBottom>
//                   120
//                 </Typography>
//               </Grid>
//             </Grid>
//             <Typography variant="body2" height={80} gutterBottom>
//               {PROFILE_DATA.description}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button size="small" variant="contained">
//               Edit Profile
//             </Button>
//             <Button size="small" variant="contained">
//               Share Profile
//             </Button>
//             <Button size="small" variant="contained">
//               Add Post
//             </Button>
//           </CardActions>
//         </Grid>
//       </Grid>
//     </Card>
//   </React.Fragment>
// );

const Connect = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Navbar />
      </Container>
    </>
  );
};

export default Connect;
