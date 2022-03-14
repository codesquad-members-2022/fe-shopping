import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server is Listening on port:${PORT}`);
});
