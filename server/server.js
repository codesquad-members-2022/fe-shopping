import express from "express";
import cors from "cors";
import searchRouter from "./routers/searchRouter.js";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
});

app.use("/search", searchRouter);
