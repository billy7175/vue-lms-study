import axios from "axios";

const getUsers = () => {
  try {
    console.log("get-users");
    const response = axios.get("http://127.0.0.1:3000/api/users");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const fetchUserById = (id) => {
  try {
    console.log("#fetchUserById", id);
    const response = axios.get(`http://127.0.0.1:3000/api/users/${id}`);
    return response;
  } catch (error) {
    console.log("#error", error);
  }
};

export { getUsers, fetchUserById };
