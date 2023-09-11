// eslint-disable-next-line no-undef
import axios, { AxiosBasicCredentials } from "axios";
const baseUrl = "/api/login";

const login = async (credentials: AxiosBasicCredentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
