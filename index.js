import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  getAllDrawings,
  createDrawing,
  getDrawing,
  updateDrawing,
  deleteDrawing,
} from "./controllers/all.controller.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://drawing-board-gkmo.onrender.com",
    credentials: true,
  })
);
// app.use(cors());

app.use(express.json());
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db connection
mongoose
  .connect(process.env.MongoAtlas_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

app.post("/create-drawing", createDrawing);
app.get("/get-drawings", getAllDrawings);
app.post("/get-drawing", getDrawing);
app.patch("/update-drawing", updateDrawing);
app.post("/delete-drawing", deleteDrawing);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running!");
});
