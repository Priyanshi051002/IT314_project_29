import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signinout" />;
  }
  return children;
};

export default Private;
