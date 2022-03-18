import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("./public"));
app.set("port", PORT);

app.get("/", (req, res) => {
    res.sendFile(path.resolve() + "/index.html");
});

app.listen(PORT, () => {
    console.log("서버 시작 : " + app.get("port"));
});