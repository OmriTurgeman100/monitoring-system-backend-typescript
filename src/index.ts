import express from "express";
import nodeRouter from "./routes/nodeRouter";
import reportRouter from "./routes/reportRouter";
import rulesRouter from "./routes/rulesRouter";

const app = express();
const port: number = 80;

app.use(express.json());

app.use("/api/v1/nodes", nodeRouter);
app.use("/api/v1/reports", reportRouter);
app.use("/api/v1/rules", rulesRouter);
app.use("/api/v1/excluded")

app.listen(port, () => {
  console.log(`🚀 Server is up and running! Access it at: http://localhost:${port}/`);
});
