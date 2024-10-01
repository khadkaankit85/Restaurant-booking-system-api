import express from "express";

const app=express()

//middleware to parse data
app.use(express.json())

//Routes go here:)

export default app