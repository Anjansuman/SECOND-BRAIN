import mongoose from "mongoose";

mongoose.connect('mongodb+srv://Anjan:Ancient%407645@cluster0.7mroy.mongodb.net/second-brain');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const TagSchema = new mongoose.Schema({
    title: String
});

const ContentSchema = new mongoose.Schema({
    link: { type: String },
    type: { type: String },
    title: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const LinkSchema = new mongoose.Schema({
    hash: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }
})

export const UserModel = mongoose.model("User", UserSchema);
export const TagModel = mongoose.model("Tag", TagSchema);
export const ContentModel = mongoose.model("Content", ContentSchema);
export const LinkModel = mongoose.model("Links", LinkSchema);