// Load environment variables
require("dotenv").config();

// Import dependencies
const fs = require("fs");
const OpenAI = require("openai");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Readable } = require("stream");

// Initialise services
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_ACCESS_KEY,
  dangerouslyAllowBrowser: true,
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Constants
const TEMPORARY_AUDIO_FILENAME = "temp_audio_file.mp3";

const getQuestionsSet = async (company, role, description) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are trained to generate behavioral interview questions based on specific job details.",
      },
      {
        role: "user",
        content: `Generate a list of behavioral interview questions for a job role at ${company}. The job title is ${role}. Here is the job description: ${description}`,
      },
      {
        role: "user",
        content:
          "Based on the information provided, what are some most probable behavioral interview questions? Please provide them in the following json format: { questions: [list of question strings] }",
      },
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
  });

  // Parse raw json response and extract questions

  // Throw error is response is not of array type or is empty
  if (!Array.isArray(completion.choices) || completion.choices.length < 0) {
    throw new Error(
      "Error occured in OpenAI chat api response while generating behavioural questions set."
    );
  }

  const questionsRawJSON = completion.choices[0].message.content;
  const questions = Object(JSON.parse(questionsRawJSON))["questions"];

  return questions;
};

// function to save buffer to a temporary file
const bufferToFile = async (buffer, filename) => {
  fs.writeFileSync(filename, buffer);
  return filename;
};

// function to transcribe an audio file using openai transcription api
const transcribeAudio = async (audioFile) => {
  try {
    console.log("Attempting transcription of audioFile.");
    const buffer = audioFile.buffer;
    const audioFilename = await bufferToFile(buffer, TEMPORARY_AUDIO_FILENAME);
    console.log(`Saved file temporarily as ${audioFilename}.`);
    const fileStream = fs.createReadStream(audioFilename);
    const transcription = await openai.audio.transcriptions.create({
      file: fileStream,
      model: "whisper-1",
      response_format: "verbose_json",
      timestamp_granularities: ["word"],
    });

    console.log(
      "Transcription request is successful. Transcribed text:",
      transcription.text
    );

    fs.unlinkSync(audioFilename);
    console.log(`Temporary file ${audioFilename} in unlinked.`);

    return transcription;
  } catch (error) {
    console.error("Error transcribing audio:", error);
  }
};

router.get("/", (req, res, next) => {
  return res.json({ message: "jobs api is called..." });
});

router.post("/fetch-behavioural-questions", async (req, res) => {
  const { company, role, description } = req.body;

  if (!company || !role) {
    return res
      .status(400)
      .send("All fields are required: company, role, and description.");
  }

  console.log("Received job details:", { company, role, description }); // TODO: Include a logger instead of console statement

  try {
    generatedQuestions = await getQuestionsSet(company, role, description);

    res.status(200).json({
      message: "Questions generated successfully.",
      data: {
        questions: generatedQuestions,
      },
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post(
  "/fetch-audio-transcription",
  upload.single("file"),
  async (req, res, next) => {
    if (!req.file) {
      console.log("No file uploaded.");
      return res.status(400).send("No file uploaded.");
    }

    console.log(
      `Received audio file with ${req.file.size} bytes for transcription`
    );

    try {
      console.log(
        "Making transcription request to the transcribeAudio function."
      );
      const resultTranscription = await transcribeAudio(req.file);

      if (!resultTranscription || !resultTranscription.text) {
        res.status(500).send("Failed to transcribe audio.");
      }

      const resultTranscriptionText = resultTranscription.text;
      console.log("Transcription request is successful");

      res.status(200).json({
        message: "Audio file transcribed successfully! ",
        transcription: {
          text: resultTranscriptionText,
        },
      });
    } catch (error) {
      console.error("Error transcribing audio:", error);
      res.status(500).send({
        message: "Failed to transcribe audio.",
        errorDescription: error,
      });
    }
  }
);

module.exports = router;
