require("dotenv").config();
const cors = require("cors");
const express = require("express");
const router = require("./router/upload.routes");

const app = express();


app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
  })
);
// app.options("*", cors());
app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server is running on port ${process.env.PORT}`);
  }
});
