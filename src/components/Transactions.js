import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";
export const Transactions = () => {
  const [transactionType, setTransactionType] = useState("credit");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [handleComment, setHandleComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      amount: transactionAmount,
      type: transactionType,
      comment: handleComment,
    };
    console.log(body);
  };

  return (
    <>
      <h3>Add Transactions</h3>
      <form>
        <TextField
          variant="standard"
          type={"number"}
          label="Amount"
          min={0}
          onChange={(e) => setTransactionAmount(e.target.value)}
          required
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
          />
        </div>

        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
    </>
  );
};
