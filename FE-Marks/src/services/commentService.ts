import axios from "axios";
import { TComment } from "../types/comment";
const baseUrl = '/api/comments'

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data
}

const create = async (content: TComment) => {
    const response = await axios.post(baseUrl, content)
    return response.data
}

export default { create, getAll }