import axios from "axios";
const baseUrl = "/api/marks";
import { TMark, TNewMark } from "../types/mark";

let token: string;

const setToken = (newToken: string) => (token = `Bearer ${newToken}`);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newMark: TNewMark) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newMark, config);
  return response.data;
};

const update = async (id: string, updatedMark: TMark) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, updatedMark, config);
  return response.data;
};

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, setToken, create, update, remove };
