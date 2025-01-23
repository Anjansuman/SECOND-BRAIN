import express from "express";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, TagModel } from "./db/schema";
import { userMiddleware } from "./MIddlewares/user";

import { JWT_PASSWORD } from "./config";

const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
    
        // hash the password
        await UserModel.create({
            username,
            password
        });
    
        res.json({
            msg: "user created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: error
        })
    }

})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const exists = await UserModel.findOne({
        username,
        password
    });
    if(exists) {
        const token = jwt.sign({
            id: exists._id
        }, JWT_PASSWORD);

        res.status(200).json({
            msg: "logged-in!",
            token: token
        })
    } else {
        res.status(411).json({
            msg: "user doesn't exists"
        })
    }
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;

    const content = await ContentModel.create({
        link,
        type,
        title,
        tags: [],
        //@ts-ignore
        userId: req.userId
    });

    res.status(200).json({
        msg: "content added"
    })

})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")

    res.status(200).json({
        content
    })
    
})

app.delete("/api/v1/content",userMiddleware, async (req, res) => {
    // @ts-ignore
    const contentId = req.body.contentId;

    const content = await ContentModel.deleteOne({
        _id: contentId,
        // @ts-ignore
        userId: req.userId
    });

    res.status(200).json({
        msg: "content deleted",
        content: content,
        contentId: contentId
    })
})

app.listen(3000, () => {
    console.log("your app started...");
});