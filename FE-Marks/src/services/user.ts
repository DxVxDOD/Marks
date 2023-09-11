import axios from "axios";
const baseUrl = "/api/users";
import { User } from "../types/user";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (user: User) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

export default { create, getAll };
