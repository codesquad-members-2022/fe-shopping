import express from "express";
import cors from "cors";
import searchRouter from "./routers/searchRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
});

app.use("/search", searchRouter);
