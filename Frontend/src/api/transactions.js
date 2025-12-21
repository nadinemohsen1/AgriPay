// api/transactions.js
const API_URL = "http://localhost:5000/api/transactions";

export const addTransaction = async (data, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // send token for authentication
    },
    body: JSON.stringify(data),
  });
    if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to record transaction");
  }

  return res.json();
};
