import axios, { AxiosResponse } from "axios";

const getAll = async (baseUrl: string) => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async <T extends { [key: string]: any }>(
  content: T,
  baseUrl: string,
): Promise<AxiosResponse<T>> => {
  const response = await axios.post(baseUrl, content);
  return response.data;
};

export default { create, getAll };
