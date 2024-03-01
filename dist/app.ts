import * as dotenv from "dotenv"
import express from "express"
import bodyParser, * as BodyParser from "body-parser"
import { orderRouter } from "../routes/orderRouter"

const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use("/order", orderRouter)

app.listen(process.env.PORT, () => {
    console.log("Node server is running")
})