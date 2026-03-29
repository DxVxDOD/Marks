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
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	// comments: [
	//   {
	//     type: mongoose.Schema.Types.ObjectId,
	//     ref: "Comment",
	//   },
	// ],
	createdAt: {
		required: true,
		type: Date,
		default: Date.now(),
	},
});

// markSchema.set("toJSON", {
//   transform(_document, returnedObject) {
//     // returnedObject.id = returnedObject._id.toString();
//     // returnedObject._id = {} as ObjectId;
//     returnedObject.__v = 0;
//   },
// });

// markSchema.set("toObject", {
//   transform(_document, returnedObject) {
//     // returnedObject.id = returnedObject._id.toString();
//     // returnedObject._id = {} as ObjectId;
//     returnedObject.__v = 0;
//   },
// });

const Mark = mongoose.model("Mark", markSchema);

export default Mark;
