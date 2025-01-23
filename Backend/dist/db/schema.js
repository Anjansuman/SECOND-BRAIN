"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.TagModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb+srv://Anjan:Ancient%407645@cluster0.7mroy.mongodb.net/second-brain');
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const TagSchema = new mongoose_1.default.Schema({
    title: String
});
const ContentSchema = new mongoose_1.default.Schema({
    link: { type: String },
    type: { type: String },
    title: String,
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
exports.TagModel = mongoose_1.default.model("Tag", TagSchema);
exports.ContentModel = mongoose_1.default.model("Content", ContentSchema);
