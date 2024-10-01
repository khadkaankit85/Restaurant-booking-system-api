import express from "express";

const app=express()

//middleware to parse data
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))



//Routes go here:)

export default app