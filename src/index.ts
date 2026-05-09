import express from "express";
import cors from "cors";
import executeRouter from "./routes/execute";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/execute", executeRouter);

app.listen(3000, () => {
  console.log("runtime server running at 3000");
});