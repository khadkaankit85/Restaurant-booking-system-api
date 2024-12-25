import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/user.routes";
import tableRouter from "./Routes/table.routes";
import reservationRouter from "./Routes/reservation.routes";

const app = express();

//middleware to parse data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// endpoint for /user
app.use("/user", userRouter);


app.use("/table", tableRouter);
app.use("/reservation", reservationRouter);

//Routes go here:)

export default app;
