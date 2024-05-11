import backendApiClient from "../core/backendAPIClient";

class InterviewService {
  static async fetchBehaviouralQuestions(company, role, description) {
    try {
      const response = await backendApiClient.post(
        "/scenarios/jobs/fetch-behavioural-questions",
        {
          company: company,
          role: role,
          description: description,
        }
      );

      console.log("Response:", response);

      const responseData = response.data;
      if (!responseData) {
        throw new Error(
          "Response data not present in the backend api response"
        );
      }

      const questionsData = responseData.data;
      if (!questionsData || !questionsData.questions) {
        throw new Error(
          "Questions data not present in the backend api response"
        );
      }

      return questionsData.questions;
    } catch (error) {
      console.error(`InterviewService: Error fetching questions: ${error}`);
      throw error;
    }
  }

  static async fetchAudioTranscription(blob) {
    const formData = new FormData();
    formData.append("file", blob, "audio-file.ogg");

    try {
      const response = await fetch(
        "/scenarios/jobs/fetch-audio-transcription",
        {
          method: "POST",
          headers: {},
          body: formData,
        }
      );

      if (response.status !== 200) {
        throw new Error("Request unsuccessful: " + response);
      }

      const data = await response.json();
      if (!data.transcription) {
        throw new Error(
          "Transcripts not found in response payload: " + response
        );
      }

      const transcriptionObj = data.transcription;
      return transcriptionObj;
    } catch (error) {
      console.error("Failed to upload audio:", error);
      return null;
    }
  }
}

export default InterviewService;
