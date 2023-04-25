import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ShowPostCards from "./pages/Profile/ShowPostCards";
import SignInOutContainer from "./containers/index";
import Forgotpassword from "./pages/Login/Forgotpassword";
import Passwordchangeq from "./pages/Login/Passwordchangeq";
import Connect from "./pages/Connect/Connect";
import MyConnection from "./pages/MyConnection/MyConnection";
import AddPost from "./pages/Profile/AddPost";
import Private from "./routes/Private";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Private>
              <Home />{" "}
            </Private>
          }
        />
        <Route
          path="/profile"
          element={
            <Private>
              <Profile />
            </Private>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signinout" element={<SignInOutContainer />} />
        <Route path="/fp" element={<Forgotpassword />} />
        <Route
          path="/myposts"
          element={
            <Private>
              <ShowPostCards />
            </Private>
          }
        />
        <Route path="/pc" element={<Passwordchangeq />} />
        <Route
          path="/connect"
          element={
            <Private>
              <Connect />
            </Private>
          }
        />
        <Route
          path="/myconnection"
          element={
            <Private>
              <MyConnection />
            </Private>
          }
        />
        <Route
          path="/profile/addpost"
          element={
            <Private>
              <AddPost />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
