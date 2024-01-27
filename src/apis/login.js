import axios from "axios";

const loginPost = async (params) => {
  try {
    console.log("#loginPost", params);
    const response = await axios.post(
      "http://127.0.0.1:3000/api/login",
      params
    );
    console.log("#response", response);
    return response;
  } catch (error) {
    console.log("#loginPost", error);
    throw error;
  }
};

export { loginPost };
