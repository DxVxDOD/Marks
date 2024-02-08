"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    content: {
        required: true,
        type: String,
    },
    markId: {
        required: true,
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Mark",
    },
    userId: {
        required: true,
        type: mongoose_1.default.Schema.Types.ObjectId,
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
commentSchema.set("toObject", {
    transform(_document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const Comment = mongoose_1.default.model("Comment", commentSchema);
exports.default = Comment;
//# sourceMappingURL=commentModel.js.map