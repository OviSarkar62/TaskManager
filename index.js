const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
app.use(express.json());

// dotenv config
dotenv.config();
connectDb();

// routes
const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoute");
const taskRoute = require("./routes/taskRoute");
const notificationRoute = require("./routes/notificationRoute");

app.use("/api/users", userRoute);
app.use("/api/projects", projectRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/notifications", notificationRoute);

// deployment config
const path = require("path");

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// port
const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
