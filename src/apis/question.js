import axios from "axios";

const getQuestions = async () => {
  try {
    console.log("#login");
    const response = await axios.get("http://127.0.0.1:3000/api/questions");
    console.log("#response", response);
    return response;
  } catch (error) {
    console.log("#error", error);
    throw error;
  }
};

export { getQuestions };
