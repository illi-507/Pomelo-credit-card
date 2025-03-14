export const Samples = [
  {
    creditLimit: 1000,
    events: [
      { eventType: "TXN_AUTHED", eventTime: 1, txnId: "t1", amount: 123 },
    ],
  },
  {
    creditLimit: 1000,
    events: [
      { eventType: "TXN_AUTHED", eventTime: 1, txnId: "t1", amount: 123 },
      { eventType: "TXN_AUTH_CLEARED", eventTime: 2, txnId: "t1" },
    ],
  },
  {
    creditLimit: 1000,
    events: [
      { eventType: "TXN_AUTHED", eventTime: 1, txnId: "t1", amount: 123 },
      { eventType: "TXN_SETTLED", eventTime: 2, txnId: "t1", amount: 456 },
    ],
  },
  {
    creditLimit: 1000,
    events: [
      { eventType: "TXN_AUTHED", eventTime: 1, txnId: "t1", amount: 123 },
      { eventType: "TXN_SETTLED", eventTime: 2, txnId: "t1", amount: 456 },
      {
        eventType: "PAYMENT_INITIATED",
        eventTime: 3,
        txnId: "p1",
        amount: -456,
      },
    ],
  },
  {
    creditLimit: 1000,
    events: [
      { eventType: "TXN_AUTHED", eventTime: 1, txnId: "t1", amount: 123 },
      { eventType: "TXN_SETTLED", eventTime: 2, txnId: "t1", amount: 456 },
      {
        eventType: "PAYMENT_INITIATED",
        eventTime: 3,
        txnId: "p1",
        amount: -456,
      },
      { eventType: "PAYMENT_CANCELED", eventTime: 4, txnId: "p1" },
    ],
  },
  {
    creditLimit: 1000,
    events: [
      { eventType: "TXN_AUTHED", eventTime: 1, txnId: "t1", amount: 123 },
      { eventType: "TXN_SETTLED", eventTime: 2, txnId: "t1", amount: 456 },
      {
        eventType: "PAYMENT_INITIATED",
        eventTime: 3,
        txnId: "p1",
        amount: -456,
      },
      { eventType: "PAYMENT_POSTED", eventTime: 4, txnId: "p1" },
    ],
  },
];
