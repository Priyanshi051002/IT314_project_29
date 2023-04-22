import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ShowPostCards from "./pages/Profile/ShowPostCards";
import AddPost from "./pages/Home/AddPost";
import AddPost from "./pages/Profile/AddPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myposts" element={<ShowPostCards />} />
          <Route path="/addPost" element={<AddPost />} />
        </Routes>
      </BrowserRouter>
          <Route path="/profile/addPost" element={<AddPost />} />
        </Routes >
      </BrowserRouter >
    </>
  );
}

export default App;
