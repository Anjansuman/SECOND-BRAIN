"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema_1 = require("./db/schema");
const user_1 = require("./MIddlewares/user");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        // hash the password
        yield schema_1.UserModel.create({
            username,
            password
        });
        res.json({
            msg: "user created successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: error
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const exists = yield schema_1.UserModel.findOne({
        username,
        password
    });
    if (exists) {
        const token = jsonwebtoken_1.default.sign({
            id: exists._id
        }, config_1.JWT_PASSWORD);
        res.status(200).json({
            msg: "logged-in!",
            token: token
        });
    }
    else {
        res.status(411).json({
            msg: "user doesn't exists"
        });
    }
}));
app.post("/api/v1/content", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    const content = yield schema_1.ContentModel.create({
        link,
        type,
        title,
        tags: [],
        //@ts-ignore
        userId: req.userId
    });
    res.status(200).json({
        msg: "content added"
    });
}));
app.get("/api/v1/content", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield schema_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.status(200).json({
        content
    });
}));
app.delete("/api/v1/content", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const contentId = req.body.contentId;
    const content = yield schema_1.ContentModel.deleteOne({
        _id: contentId,
        // @ts-ignore
        userId: req.userId
    });
    res.status(200).json({
        msg: "content deleted",
        content: content,
        contentId: contentId
    });
}));
app.listen(3000, () => {
    console.log("your app started...");
});
