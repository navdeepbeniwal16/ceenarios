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
import CircularProgress from "@mui/material/CircularProgress";
import InterviewService from "../services/scenarios/interviewService";

export default function JobDetailsUpload() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [isCompanyProvided, setIsCompanyProvided] = useState(true);
  const [isRoleProvided, setIsRoleProvided] = useState(true);

  const [companyName, setCompanyName] = useState("");
  const [jobRole, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ companyName, jobRole: jobRole, jobDescription });

    setIsCompanyProvided(true);
    setIsRoleProvided(true);

    if (!companyName || !jobRole) {
      if (!companyName) {
        setIsCompanyProvided(false);
      }

      if (!jobRole) {
        setIsRoleProvided(false);
      }

      return;
    }

    setIsUploading(true);

    const questions = await InterviewService.fetchBehaviouralQuestions(
      companyName,
      jobRole,
      jobDescription
    );
    console.log("Questions (fetched from backend api):", questions);

    navigate("/jobs/questions", {
      state: {
        questions: questions,
        companyName: companyName,
        jobRole: jobRole,
        jobDescription: jobDescription,
      },
    });
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
          {!isCompanyProvided && (
            <Typography variant="body2" color="red">
              Company name is a required field
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="role"
            label="Role"
            name="role"
            autoComplete="role"
            value={jobRole}
            onChange={(e) => setRole(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "violet.dark",
                },
              },
            }}
          />
          {!isRoleProvided && (
            <Typography variant="body2" color="red">
              Role is a required field
            </Typography>
          )}
          <TextField
            margin="normal"
            fullWidth
            name="jobDescription"
            label="Job Description"
            id="job-description"
            multiline
            rows={10}
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
            disabled={isUploading}
          >
            Upload
          </Button>
          {isUploading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: "3px",
                mb: "3px",
              }}
            >
              <CircularProgress color="violet" />
            </Box>
          )}
        </Box>
      </Container>
    </Container>
  );
}
