import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/user.routes";
import tableRouter from "./Routes/table.routes";
import reservationRouter from "./Routes/reservation.routes";
import itemRoutes from "./Routes/items.routes";
import path from "path";
import { fileURLToPath } from "url";
//@ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

//middleware to parse data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());
/*
 * POST  /user/signup
 *
 */
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("*", (req, res) => {
  app.use("/user", userRouter);
  res.sendFile(path.join(__dirname, "..", "frontend/dist", "index.html"));
});
// endpoint for /user
app.use("/items", itemRoutes);
app.use("/table", tableRouter);
app.use("/reservation", reservationRouter);

//Routes go here:)

export default app;
