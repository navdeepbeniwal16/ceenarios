import backendApiClient from "../core/backendAPIClient";

class InterviewService {
  static async fetchBehaviouralQuestions(company, role, description) {
    try {
      const response = await backendApiClient.post("/scenarios/jobs", {
        company: company,
        role: role,
        description: description,
      });

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
}

export default InterviewService;
