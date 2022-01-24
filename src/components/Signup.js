import React, { useRef, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import { Button, Card } from "@mui/material";
import { useAuth } from "../contexts/AuthProvider";
let vertical = "bottom";
let horizontal = "center";

export default function Signup() {
  const [name, setName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signupHandle, error, signupStatus, loading } = useAuth();

  const handleSignUpForm = (e) => {
    console.log("handleSignUpForm")
    e.preventDefault();
    const body = {
      name: name,
      email: email,
      password: password,
      passwordConfirm:passwordConfirm
    };
    signupHandle(body,e);
  
   
  };
  return (
    <>
      <Card
        style={{ maxWidth: "400px", display: "block", margin: "10px auto" }}
      >
        <h2 style={{textAlign:"center"}}>Signup</h2>
        {error !== "" ? <p className="errorText">{error}</p> : ""}
        <form onSubmit={handleSignUpForm}  style={{textAlign:"center"}}>
          <TextField
            variant="standard"
            type={"text"}
            label="Name"
            required
            className="inputField"
            onChange={(e) => setName(e.target.value)}
          />
          <br></br>
          <TextField
            variant="standard"
            type={"email"}
            label="Email"
            required
            className="inputField"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <TextField
            variant="standard"
            type={"password"}
            label="Password"
            required
            className="inputField"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <TextField
            variant="standard"
            type={"password"}
            label="Confirm Password"
            required
            className="inputField"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <br></br>
          <Button
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "20px", width: "90%" }}
            type="submit"
            disabled={loading}
          >
            SignUp
          </Button>
        </form>
        <p style={{textAlign:"center"}}>Already have an Account Login</p>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={signupStatus}
        message="User is Successfully Signed Up"
        key={vertical + horizontal}
      />
    </>
  );
}
