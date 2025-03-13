export function summarize(inputJSON) {
  const input = JSON.parse(inputJSON);
  let creditLimit = input.creditLimit;
  let availableCredit = creditLimit;
  let payableBalance = 0;
  let pendingTransactions = [];
  let settledTransactions = [];
  let authMap = {}; // Map to track initially authorized transactions
  let paymentMap = {}; // Map to track initiated payments

  for (const event of input.events) {
    const { eventType, eventTime, txnId, amount } = event;

    if (eventType === "TXN_AUTHED") {
      authMap[txnId] = { txnId, initialTime: eventTime, amount };
      pendingTransactions.push({ txnId, amount, initialTime: eventTime });
      availableCredit -= amount;
    } else if (eventType === "TXN_SETTLED" && authMap[txnId]) {
      const initialTime = authMap[txnId].initialTime;
      const prevAmount = authMap[txnId].amount;
      availableCredit = availableCredit + prevAmount - amount; // Adjust credit based on the final settled amount
      payableBalance += amount;
      settledTransactions.push({
        txnId,
        amount,
        initialTime,
        finalTime: eventTime,
      });
      pendingTransactions = pendingTransactions.filter(
        (txn) => txn.txnId !== txnId
      );
    } else if (eventType === "TXN_AUTH_CLEARED") {
      if (authMap[txnId]) {
        availableCredit += authMap[txnId].amount;
        pendingTransactions = pendingTransactions.filter(
          (txn) => txn.txnId !== txnId
        );
        delete authMap[txnId];
      }
    } else if (eventType === "PAYMENT_INITIATED") {
      console.log("init: ", availableCredit, payableBalance);
      paymentMap[txnId] = { txnId, initialTime: eventTime, amount };
      pendingTransactions.push({ txnId, amount, initialTime: eventTime });
      payableBalance += amount;
    } else if (eventType === "PAYMENT_POSTED" && paymentMap[txnId]) {
      const initialTime = paymentMap[txnId].initialTime;
      settledTransactions.push({
        txnId,
        amount: paymentMap[txnId].amount,
        initialTime,
        finalTime: eventTime,
      });
      pendingTransactions = pendingTransactions.filter(
        (txn) => txn.txnId !== txnId
      );
      const payInitiated = paymentMap[txnId].amount;

      availableCredit += -payInitiated;
    } else if (eventType === "PAYMENT_CANCELED") {
      pendingTransactions = pendingTransactions.filter(
        (txn) => txn.txnId !== txnId
      );
      const prevAmount = paymentMap[txnId].amount;
      payableBalance -= prevAmount;
    }
  }

  // Sorting transactions newest to oldest by initial time
  pendingTransactions.sort((a, b) => b.initialTime - a.initialTime);
  settledTransactions.sort((a, b) => b.initialTime - a.initialTime);

  // Only keep the three most recent settled transactions
  settledTransactions = settledTransactions.slice(0, 3);

  return {
    availableCredit,
    payableBalance,
    pendingTransactions,
    settledTransactions,
  };
}
