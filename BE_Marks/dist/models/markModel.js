"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const markSchema = new mongoose_1.default.Schema({
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
    likes: {
        required: true,
        type: Number,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    createdAt: {
        required: true,
        type: Date,
        default: Date.now(),
    },
});
markSchema.set("toJSON", {
    transform(_document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__V;
    },
});
markSchema.set("toObject", {
    transform(_document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__V;
    },
});
const Mark = mongoose_1.default.model("Mark", markSchema);
exports.default = Mark;
//# sourceMappingURL=markModel.js.map