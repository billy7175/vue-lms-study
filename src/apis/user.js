import axios from "axios";


const getUsers = () => {
  try {
    console.log("get-users");
    const response = axios.get("http://127.0.0.1:3000/api/users");
    return response
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getUsers };
