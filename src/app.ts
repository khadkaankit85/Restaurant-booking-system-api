import express from "express";
import userRouter from "./Routes/user.routes"

const app=express()

//middleware to parse data
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

// endpoint for /user
app.post("/user",userRouter)

//Routes go here:)

export default app