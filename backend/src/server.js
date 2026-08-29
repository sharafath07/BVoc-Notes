import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import resourceRoutes from './routes/resource.routes.js'
import semesterRoutes from './routes/semester.routes.js'
import subjectRoutes from './routes/subject.routes.js'

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "B.Voc SD Space API is running",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/semesters", semesterRoutes);
app.use("/api/subjects", subjectRoutes);

app.listen(env.PORT, () => {
    console.log(`API running on http://localhost:${env.PORT}`);
});