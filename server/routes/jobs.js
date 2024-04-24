const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.json({ message: "jobs api is called..." });
});

router.post("/", (req, res) => {
  const { company, role, description } = req.body;

  if (!company || !role || !description) {
    return res
      .status(400)
      .send("All fields are required: company, role, and description.");
  }

  console.log("Received job details:", { company, role, description });

  res
    .status(201)
    .json({ message: "Job details received successfully.", data: req.body });
});

module.exports = router;
