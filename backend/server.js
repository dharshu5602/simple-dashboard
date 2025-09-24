const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    const users = response.data.slice(0, 5);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
