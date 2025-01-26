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
const randomstring_1 = __importDefault(require("randomstring"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const exist = yield schema_1.UserModel.findOne({
            username,
            password
        });
        if (exist) {
            res.status(403).json({
                msg: "User already exists"
            });
            return;
        }
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
    const userId = req.userId;
    const content = yield schema_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.status(200).json({
        content
    });
}));
app.delete("/api/v1/content", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    const content = yield schema_1.ContentModel.deleteOne({
        _id: contentId,
        userId: req.userId
    });
    res.status(200).json({
        msg: "content deleted",
        content: content,
        contentId: contentId
    });
}));
app.post("/api/v1/brain/share", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    const hash = randomstring_1.default.generate(20);
    try {
        if (share) {
            const exists = yield schema_1.LinkModel.findOne({
                userId: req.userId
            });
            if (exists) {
                res.status(200).json({
                    hash: exists.hash
                });
                return;
            }
            yield schema_1.LinkModel.create({
                hash: hash,
                userId: req.userId
            });
        }
        else {
            yield schema_1.LinkModel.deleteOne({
                userId: req.userId
            });
            res.status(200).json({
                msg: "Link doesn't exist anymore!",
                hash: hash
            });
        }
        res.status(200).json({
            msg: "updated shared link",
            hash: hash
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    try {
        const link = yield schema_1.LinkModel.findOne({
            hash
        });
        if (!link) {
            res.status(411).json({
                msg: "Brain doesn't exist"
            });
            return;
        }
        const content = yield schema_1.ContentModel.find({
            userId: link.userId
        });
        const user = yield schema_1.UserModel.findOne({
            _id: link.userId
        });
        if (!user) {
            res.status(411).json({
                msg: "User with this I'd doesn't exist anymore!"
            });
            return;
        }
        res.status(200).json({
            username: user.username,
            content: content
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}));
app.listen(3000, () => {
    console.log("your app started...");
});
