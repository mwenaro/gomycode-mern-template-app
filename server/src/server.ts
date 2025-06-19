import express from "express"
import {config} from 'dotenv'
import cors from 'cors'
import { dbConnect } from "./db/dbConnect"
import { todoRouter } from "./routes/todoRoute"

//load env vars
config()

//variables
const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"
const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cors middleware
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}))

//db connection
dbConnect()

//routes
app.get("/", (req, res)=>{
  res.json({
    message: "Welcome to MERN Template API",
    version: "1.0.0",
    status: "active",
    endpoints: {
      todos: "/todos"
    }
  })
})

//todos route
app.use("/todos", todoRouter)

//404 error handler
app.use("*", (req: express.Request, res: express.Response) => {
    return res.status(404).json({
      success: false,
      error: "Route not found",
      message: `The endpoint ${req.originalUrl} does not exist`
    })
})

//global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global Error:", error);
  return res.status(500).json({
    success: false,
    error: "Internal server error",
    message: process.env.NODE_ENV === 'development' ? error.message : "Something went wrong"
  })
})

//start app
app.listen(PORT, ()=>{
  console.log(`🚀 Server is running on PORT ${PORT}`)
  console.log(`📱 Client URL: ${CLIENT_URL}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})