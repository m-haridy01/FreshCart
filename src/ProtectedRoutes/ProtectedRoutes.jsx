import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/TokenContext";


export default function ProtectedRoutes({ children }) {
  let {token} = useContext(AuthContext)
  return (
    <>{token ? children : <Navigate to={"/login"} />}</>
  );
}
