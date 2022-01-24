import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { Button, Card } from "@mui/material";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const { loginHandle, error, signupStatus } = useAuth();

  const handleLoginForm = async (e) => {
    console.log("handle login");
    const body = {
      email: email,
      password: passowrd,
    };

    const status = await loginHandle(body, e);
    console.log(status);
  };
  useEffect(() => {
    if (signupStatus) {
      history("/history");
    }
  }, [signupStatus]);

  return (
    <>
      <Card
        style={{ maxWidth: "400px", display: "block", margin: "10px auto" }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
        {error !== "" ? <p className="errorText">{error}</p> : ""}
        <form onSubmit={handleLoginForm} style={{ textAlign: "center" }}>
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
          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: "20px", marginBottom: "20px", width: "90%" }}
          >
            Login
          </Button>
        </form>
        <p>New User Signup</p>
      </Card>
    </>
  );
}
