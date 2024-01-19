import axios from "axios";

const getUserAnswers = async (date) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/api/answer/${date}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export { getUserAnswers };