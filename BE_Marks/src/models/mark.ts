import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
	title: {
		required: true,
		type: String,
	},
	tag: {
		required: true,
		type: String,
	},
	url: {
		required: true,
		type: String,
	},
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

markSchema.set("toJSON", {
	transform(_document, returnedObject) {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__V;
	},
});
