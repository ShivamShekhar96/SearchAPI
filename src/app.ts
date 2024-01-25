import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import routesV1 from "./routes/routes.v1";
import getPool from "./db";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(routesV1);

const port = process.env.PORT || 4000;

const db = getPool();

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.listen(port, () => console.log("Example app is listening on port 4000."));
