import express from "express";
import nodeRouter from "./routes/nodeRouter";
import reportRouter from "./routes/reportRouter";

const app = express();
const port: number = 80;

app.use(express.json());
app.use("/api/v1/nodes", nodeRouter);
app.use("/api/v1/reports", reportRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
