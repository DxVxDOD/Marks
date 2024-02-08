import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;
const { SECRET } = process.env;
const { MONGO_URI } = process.env;

export default { PORT, SECRET, MONGO_URI };
