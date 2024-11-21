import express from "express";
import nodeRouter from "./routes/nodeRouter";

const app = express();
const port: number = 80;

app.use(express.json());
app.use("/api/v1/nodes", nodeRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
