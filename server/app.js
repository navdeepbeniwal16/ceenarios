const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const jobsRoutes = require("./routes/jobs.js");

app.use((req, res, next) => {
  if (req.path.endsWith(".json")) {
    res.type("application/json");
  }
  next();
});

// Serve JSON files from the assets directory
app.use(
  "/assets",
  express.static(path.join(__dirname, "../client/build/assets"))
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

app.use(bodyParser.json());

// Redirect to custom routes
app.use("/scenarios/jobs", jobsRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
