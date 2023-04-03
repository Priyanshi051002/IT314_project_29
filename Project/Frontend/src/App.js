import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ShowPostCards from "./pages/Profile/ShowPostCards";
import SignInOutContainer from "./containers/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */}
           <Route path="/signinout" element={<SignInOutContainer />} />
          <Route path="/myposts" element={<ShowPostCards />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
