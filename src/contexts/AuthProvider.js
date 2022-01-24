import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  
  const [token, setToken] = useState({});
  const [loading, setLoading] = useState(false);
  const [signupStatus, setSignUpStatus] = useState(false);
  const [error, setError] = useState("");
  function signupHandle(details, e) {
    e.preventDefault();
    if (details.password !== details.passwordConfirm) {
      setError("Password doesn't match");
    } else {
      const body = {
        name: details.name,
        email: details.email,
        password: details.password,
      };
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: "follow",
      };
      fetch("http://localhost:4000/api/register", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result)
          const re = JSON.parse(result);
          if (re.success === true) {
            console.log(re)
            setToken(re);
            setLoading(true);
            setSignUpStatus(true);
          } else {
            setError(re.message);
          }
        })
        .catch((error) => console.log("error", error));
    }
    return;
  }
 async function loginHandle(details, e) {
    console.log("login");
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(details),
      redirect: "follow",
    };
    fetch("http://localhost:4000/api/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const re = JSON.parse(result);
        
        if (re.success === true) {
          console.log("success")
          setToken(re);
          setLoading(true);
          setSignUpStatus(true);
          
          return true;
        } else {
          setError(re.message);
          return false;
        }
      })
      .catch((error) => console.log("error", error));
  }
  const value = {
    signupHandle,
    loginHandle,
    error,
    signupStatus,
    loading,
    token,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
