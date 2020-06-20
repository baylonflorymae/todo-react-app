import express from "express";
import path from "path";
import apiRoutes from "./routes";

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "../dist")));
app.use("/api", apiRoutes.router);
app.get("/user", apiRoutes.router);

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
