import dotenv from "dotenv";
import express from "express";
import { dbConnection } from "./database/connection.js";
import { globalErrorHandler, invalidUrlHandler } from "./src/utils/error.js";
import * as routers from "./src/modules/index.routes.js";

// process.on("uncaughtException", () => console.log("Unhandled error!"));

dotenv.config();
dbConnection();
const app = express();

app.use(express.json());
app.use(express.static("uploads"));

app.use("/users", routers.userRouter);
app.use("/companies", routers.companyRouter);
app.use("/jobs", routers.jobRouter);
app.use("/applications", routers.applicationRouter);

app.use(invalidUrlHandler);
app.use(globalErrorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}...`));

// process.on("unhandledRejection", () => console.log("Unhandled error!"));
