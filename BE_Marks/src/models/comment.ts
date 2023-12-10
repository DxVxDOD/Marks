import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
	content: {
		required: true,
		type: String,
	},
	markId: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "Mark",
	},
	userId: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	like: {
		required: true,
		type: Boolean,
	},
	numberOfLikes: {
		required: true,
		type: Number,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

commentSchema.set("toJSON", {
	transform(_document, returnedObject) {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
