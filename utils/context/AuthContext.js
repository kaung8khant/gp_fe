import React from "react";

const AuthContext = React.createContext({
  auth: false,
  setAuth: () => {},
});
export default AuthContext;
