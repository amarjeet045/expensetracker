import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { Button, Card, Grid } from "@mui/material";
import moment from "moment";
export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [creditSum, setCreditSum] = useState(0);
  const [debitSum, setDebitSum] = useState(0);
  const { token } = useAuth();
  const history = useNavigate();
  console.log(token);
  const addTransaction =  (e) =>{
    history("/transaction")
  }
  useEffect(() => {
    if (Object.keys(token).length > 0) {
      const bankHistory = async () => {
        var raw = undefined;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token.token}`);

        var requestOptions = {
          method: "GET",
          body: raw,
          headers: myHeaders,
          redirect: "follow",
        };
        const result = await fetch(
          `http://localhost:4000/api/transactions`,
          requestOptions
        );
        let res = await result.json();
        console.log(res);
        const creditFilter = res.transactions.filter(
          (doc) => doc.status === "credit"
        );
        const debitFilter = res.transactions.filter(
          (doc) => doc.status === "debit"
        );

        const creditSum = creditFilter.reduce((a, { amount }) => a + amount, 0);
        const debitSum = debitFilter.reduce((a, { amount }) => a + amount, 0);
        setTransactions(res.transactions);
        setDebitSum(debitSum);
        setCreditSum(creditSum);
      };
      bankHistory();
    } else {
      history("/login");
    }
  }, []);
  return (
    <>
     
      <Button variant="contained" onClick={addTransaction} className="newTransactionButton">Add New Transaction</Button>
      {transactions.length > 0 ? (
        <>
          <h2 style={{ textAlign: "center", color: "#333" }}>Your Balance</h2>
          <h3 style={{ textAlign: "center", color: "green" }}>
            {creditSum.toFixed(2) - debitSum.toFixed(2)}
          </h3>
          <hr></hr>
          {/* balance card  */}
          <Card className="AccountBalance"key="AmountBalance">
            <Grid container>
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <h3 style={{color:"#333"}}>Credit Amount</h3>
                <p style={{color:"green"}}>{creditSum}</p>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <h3 style={{color:"#333"}}>Debit Amount</h3>
                <p style={{color:"red"}}>{debitSum}</p>
              </Grid>
            </Grid>
          </Card>

          {/* history of  */}
          <h2 style={{ textAlign: "center", color: "#333" }}>History</h2>
          <hr></hr>
          {transactions.map((doc) => {
            console.log(doc);
            if (doc.status === "debit") {
              return (
                <>
                  <Card className="historyCardDebit"key={doc._id}>
                    <Grid container>
                      <Grid item xs={6} style={{ textAlign: "center" }}>
                        <h4>{doc.comment}</h4>
                        <p>{moment(doc.timestamp).format("Do MMM YYYY")}</p>
                      </Grid>
                      <Grid item xs={6} style={{ textAlign: "center" }}>
                        <h4>Amount</h4>
                        <p style={{ color: "red" }}>{doc.amount}</p>
                      </Grid>
                    </Grid>
                  </Card>
                </>
              );
            } else {
              return (
                <>
                  <Card className="historyCardCredit" key={doc._id}>
                    <Grid container>
                      <Grid item xs={6} style={{ textAlign: "center" }}>
                        <h4>{doc.comment}</h4>
                        <p>{moment(doc.timestamp).format("Do MMM YYYY")}</p>
                      </Grid>
                      <Grid item xs={6} style={{ textAlign: "center" }}>
                        <h4>Amount</h4>
                        <p style={{ color: "green" }}>{doc.amount}</p>
                      </Grid>
                    </Grid>
                  </Card>
                </>
              );
            }
          })}
        </>
      ) : (
        ""
      )}
    </>
  );
}
