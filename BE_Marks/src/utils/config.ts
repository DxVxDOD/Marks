import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;
const { SECRET } = process.env;

export default { PORT, SECRET };
