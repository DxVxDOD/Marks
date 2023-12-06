import * as Jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import express from "express";
import config from "../utils/config";

const loginRouter = express.Router();
