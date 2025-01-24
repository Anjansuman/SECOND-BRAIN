
declare global {
    namespace Express {
        export interface Request {
            userId?: string;
        }
    }
}

import express from "express";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, TagModel, LinkModel } from "./db/schema";
import { userMiddleware } from "./MIddlewares/user";
import randomstring from "randomstring";

import { JWT_PASSWORD } from "./config";

const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
    
        const exist = await UserModel.findOne({
            username,
            password
        });

        if(exist) {
            res.status(403).json({
                msg: "User already exists"
            });
            return;
        }

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
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")

    res.status(200).json({
        content
    })
    
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    const content = await ContentModel.deleteOne({
        _id: contentId,
        userId: req.userId
    });

    res.status(200).json({
        msg: "content deleted",
        content: content,
        contentId: contentId
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    const hash = randomstring.generate(20);

    try {
        if(share) {

            const exists = await LinkModel.findOne({
                userId: req.userId
            });
    
            if(exists) {
                res.status(200).json({
                    hash: exists.hash
                });
                return;
            }
    
            await LinkModel.create({
                hash: hash,
                userId: req.userId
            });
    
        } else {
            await LinkModel.deleteOne({
                userId: req.userId
            });
    
            res.status(200).json({
                msg: "Link doesn't exist anymore!",
                hash: hash
            })
        }
    
        res.status(200).json({
            msg: "updated shared link",
            hash: hash
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }

})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    try {
        const link = await LinkModel.findOne({
            hash
        });
    
        if(!link) {
            res.status(411).json({
                msg: "Brain doesn't exist"
            });
            return;
        }
    
        const content = await ContentModel.find({
            userId: link.userId
        })
    
        const user = await UserModel.findOne({
            _id: link.userId
        })
    
        if(!user) {
            res.status(411).json({
                msg: "User with this I'd doesn't exist anymore!"
            });
            return;
        }
    
        res.status(200).json({
            username: user.username,
            content: content
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

app.listen(3000, () => {
    console.log("your app started...");
});