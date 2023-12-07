import mongoose, { Document } from "mongoose";
import dotenv from "dotenv";
import { stringParser, usernameParser } from "../utils/parsers";
import { TUser } from "../types/user";

dotenv.config();

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		validate: usernameParser,
	},
	name: {
		type: String,
		validate: stringParser,
	},
	password: {
		type: String,
		validate: stringParser,
	},
	marks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Mark",
		},
	],
});

userSchema.set("toJSON", {
	transform(document: Document, returnedObject) {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.password;
	},
});

const User = mongoose.model<TUser>("User", userSchema);

export default User;
