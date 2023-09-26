require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
  console.log("Database Connected...");
});

app.use(cors());
app.use(express.json());

app.use("/", indexRouter);
app.use((err, req, res, next) => {
  const errMsg = err ? err.toString() : "Something went wrong";
  res.status(500).json({ data: "", msg: errMsg });
});
app.listen(PORT, () => {
  console.log(`App running on port ${PORT} `);
});
