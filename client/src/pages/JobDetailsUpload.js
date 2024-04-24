import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function JobDetailsUpload() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would usually handle the submission of the job details, perhaps sending it to a backend server
    console.log({ companyName, role, jobDescription });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          alignContent: "left",
        }}
      >
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
      </Box>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h5" sx={{ mt: 4 }}>
          Job Details Upload
        </Typography>
        <Typography variant="body2" color="grey" sx={{ mb: 3 }}>
          Enter the job details below to generate a tailored question bank that
          will help you prepare for the your upcoming behavioural interview.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="company-name"
            label="Company Name"
            name="companyName"
            autoComplete="company-name"
            autoFocus
            variant="outlined" // Ensure this is set
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "violet.dark",
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="role"
            label="Role"
            name="role"
            autoComplete="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "violet.dark",
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="jobDescription"
            label="Job Description"
            id="job-description"
            multiline
            rows={15}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "violet.dark",
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="violet"
            sx={{ mt: 3, mb: 2 }}
          >
            Upload
          </Button>
        </Box>
      </Container>
    </Container>
  );
}
