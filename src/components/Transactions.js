import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { Button, Card } from "@mui/material";
import { useAuth } from "../contexts/AuthProvider";
export const Transactions = () => {
  const [transactionType, setTransactionType] = useState("credit");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [handleComment, setHandleComment] = useState("");
  const { token } = useAuth();
  console.log(token);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      amount: parseFloat(transactionAmount),
      type: transactionType,
      comment: handleComment,
    };
    console.log(body);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token.token}`);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };
    fetch("http://localhost:4000/api/transaction", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const re = JSON.parse(result);

        if (re.success === true) {
          console.log("success");

          return true;
        } else {
          return false;
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Add Transactions</h3>
      <Card
        style={{ textAlign: "center", maxWidth: "400px", margin: "10px auto" }}
      >
        <form>
          <TextField
            variant="standard"
            type={"number"}
            label="Amount"
            min={0}
            onChange={(e) => setTransactionAmount(e.target.value)}
            required
            style={{ width: "360px" }}
          />
          <p>by default credit is selected</p>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            <Chip
              label="Credit"
              style={{ width: "100px" }}
              onClick={() => setTransactionType("credit")}
              color="primary"
            />
            <Chip
              label="Debit"
              style={{ width: "100px" }}
              onClick={() => setTransactionType("debit")}
              color="error"
            />
          </div>
          <div>
            <TextField
              variant="standard"
              label="Comment"
              type={"text"}
              onChange={(e) => setHandleComment(e.target.value)}
              style={{ width: "360px" }}
            />
          </div>
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              width: "360px",
              height: "40px",
            }}
          >
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
};
