import dotenv from "dotenv"
import express, { Request, Response } from "express"
import cors from "cors"
import shirts from "./routes/api/shirts.ts"
import tshirts from "./routes/api/tshirts.ts"
import mongoose from "mongoose"
import { logger } from "./middlewear/logEvents.ts"
import { corsOptions } from "./config/corsOptions.ts"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewear/errorHandler.ts"
import auth from "./routes/auth.ts"
import { credentials } from "./middlewear/credentials.ts"
import users from "./routes/api/users.ts"
import addresses from "./routes/api/addresses.ts"

dotenv.config()

const mongoString = process.env.MONGODB_URI || ""
mongoose.connect(mongoString)

const app = express()

// Handle header requirement for axios withCredentials - before CORS!
app.use(credentials)

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// custom middlewear
app.use(logger)

// serve static files
app.use(express.static("public"))

app.use("/api/shirts", shirts)
app.use("/api/tshirts", tshirts)
app.use("/api/users", users)
app.use("/api/addresses", addresses)

app.use("/auth", auth)

// I have to write verifyJWT middleware

app.all("*", (req: Request, res: Response) => {
  res.sendStatus(404)
})

app.use(errorHandler)

const PORT = process.env.PORT || 5050
mongoose.connection.once("open", () => {
  console.log("Connected to db")
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
