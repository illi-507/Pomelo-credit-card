import React, { useState, useEffect } from "react";
import { summarize } from "./util/util";
import { Textarea } from "./components/textarea";
import { Clock, CircleCheckBig, Rows2 } from "lucide-react";
import "./App.css";

const defaultInput = `{"creditLimit":1000,"events":[{"eventType":"TXN_AUTHED","eventTime":1,"txnId":"t1","amount":123}]}`;

export default function PomeloDashboard() {
  const [input, setInput] = useState(defaultInput);
  const [errorMsg, setErrorMsg] = useState("");

  const [summary, setSummary] = useState(() => summarize(defaultInput));

  function formatNumber(num) {
    return num.toFixed(2);
  }

  useEffect(() => {
    try {
      let tempSummary = summarize(input);
      if (tempSummary) {
        setErrorMsg("");
      }
      setSummary(tempSummary);
    } catch (error) {
      setErrorMsg("Invalid JSON format. Please check your input.");
    }
  }, [input]);

  console.log("type: ", typeof summary.availableCredit);

  return (
    <div className="app-container">
      <h1>Credit Card Dashboard Simulation Platform</h1>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        errorMsg={errorMsg}
      />

      <div className="balance-section-container">
        <div className="available-credit">
          <div style={{ display: "flex" }}>
            <Rows2 size={36} />
            <div style={{ marginLeft: "10px", fontSize: "30px" }}>
              Available Credit
            </div>
          </div>

          <div
            style={{
              fontSize: "20px",
              margin: "10px 40px",
              fontWeight: "bold",
            }}
          >
            {`$${formatNumber(summary.availableCredit)}`}
          </div>
        </div>

        <div className="payable-balance">
          <div style={{ display: "flex" }}>
            <Rows2 size={36} />
            <div style={{ marginLeft: "10px", fontSize: "30px" }}>
              Payable Balance
            </div>
          </div>

          <div
            style={{
              fontSize: "20px",
              margin: "10px 40px",
              fontWeight: "bold",
            }}
          >
            ${formatNumber(summary.payableBalance)}
          </div>
        </div>
      </div>

      <div className="transaction-container">
        <h3 style={{ display: "flex", color: "#fa983a" }}>
          <Clock size={25} style={{ marginRight: "10px" }} />{" "}
          <div>Pending Transactions</div>
        </h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ padding: "8px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Time</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {summary.pendingTransactions.length > 0 ? (
              summary.pendingTransactions.map((txn) => (
                <tr key={txn.txnId} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "8px" }}>{txn.txnId}</td>
                  <td style={{ padding: "8px" }}>{txn.initialTime}</td>
                  <td style={{ padding: "8px" }}>
                    {txn.amount < 0 ? "-" : " "}${Math.abs(txn.amount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ padding: "8px", textAlign: "center" }}>
                  No Pending Transactions
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <h3 style={{ display: "flex", color: "#1dd1a1", marginTop: "40px" }}>
          <CircleCheckBig size={25} style={{ marginRight: "10px" }} />{" "}
          <div>Settled Transactions</div>
        </h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ padding: "8px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Time</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {summary.settledTransactions.length > 0 ? (
              summary.settledTransactions.map((txn) => (
                <tr key={txn.txnId} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "8px" }}>{txn.txnId}</td>
                  <td style={{ padding: "8px" }}>
                    {txn.initialTime} (Finalized @ {txn.finalTime})
                  </td>
                  <td style={{ padding: "8px" }}>
                    {txn.amount < 0 ? "-" : ""}${Math.abs(txn.amount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ padding: "8px", textAlign: "center" }}>
                  No Pending Transactions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer>Copyright © Xingjian Wang</footer>
    </div>
  );
}
