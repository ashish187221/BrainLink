import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import cors from "cors";
dotenv.config();

mongoose.connect(process.env.MONGO_URL || "");

const JWT_PASSWORD = process.env.JWT_SECRET;
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
   credentials: true
})) ;

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            username,
            password: hashedPassword
        });

        res.json({
            message: "User signed up"
        });
    } catch (e) {
        res.status(409).json({
            message: "User already exists"
        });
    }
});

app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password required"
        });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.status(403).json({
            message: "User not found"
        });
    }

    const isMatch = await bcrypt.compare(
        password as string,
        user.password as string
    );

    if (!isMatch) {
        return res.status(403).json({
            message: "Incorrect password"
        });
    }

    const token = jwt.sign(
        { id: user._id },
        JWT_PASSWORD as string
    );

    res.json({ token });
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;

    await ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });

    return res.status(200).json({
        message: "Content added"
    });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;

    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username");

    res.json({
        content
    });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    });

    res.json({
        message: "Deleted"
    });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { contentIds } = req.body;

    //@ts-ignore
    const userId = req.userId;

    if (!contentIds || contentIds.length === 0) {
        return res.status(400).json({
            message: "No content selected"
        });
    }

    const hash = Math.random().toString(36).substring(2, 10);

    await LinkModel.create({
        hash,
        userId,
        contentIds 
    });

    res.json({ hash });
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({ hash });

    if (!link) {
        return res.status(404).json({
            message: "Invalid or expired link"
        });
    }

    const content = await ContentModel.find({
    _id: { $in: link.contentIds }
    });

    const user = await UserModel.findById(link.userId);

    res.json({
        username: user?.username,
        content
    });
});

app.listen(8080, () => {
    console.log("server is listening on port : 8080");
}); 