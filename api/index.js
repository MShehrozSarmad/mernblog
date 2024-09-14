import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userModel from "./models/users.model.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import path from "path";

import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const uploadMiddleware = multer({ dest: uploadDir });

const jwt = jsonwebtoken;
const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = "7834cby5in283b7yunxdhe23ynxrb789823";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.create({
      username,
      password: await bcrypt.hash(password, salt),
    });
    res.status(200).send({ message: "user created successfully!", user });
  } catch (error) {
    res.status(400).send({ message: "error creating user:: ", error });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await userModel.findOne({ username });
    const passOk = await bcrypt.compare(password, userDoc.password);
    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.status(200).cookie("token", token).json({
          userid: userDoc._id,
          username: userDoc.username,
        });
      });
    } else {
      res.status(400).send("invalid cridentials");
    }
  } catch (error) {
    res.status(400).send({ message: "error loging in user:: ", error });
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  try {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } catch (error) {
    res.json(error);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/createpost", uploadMiddleware.single("file"), (req, res) => {
  const {originalname, path} = req.file
  const parts = originalname.split('.')
  const ext = parts[parts.length - 1]
  fs.renameSync(path, path + '.' + ext)
  res.json('ok')
  // res.send(req.file)
});

try {
  mongoose
    .connect(
      "mongodb+srv://shehrozm107:lZplOS4tNzNTo44S@cluster0.c7too.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("db connected ✅");
      app.listen(3000, () => {
        console.log("app is listing at port 3000 ✅");
      });
    });
} catch (error) {
  console.log("db connection failed ❌ error::", error);
}
