import axios from "axios";

const getQuestions = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:3000/api/questions");
    return response;
  } catch (error) {
    throw error;
  }
};


const getQuestionBoards = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:3000/api/question-boards");
    return response;
  } catch (error) {
    throw error;
  }
};

export { getQuestions, getQuestionBoards };
