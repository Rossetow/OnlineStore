import * as dotenv from "dotenv"
import express from "express"
import bodyParser, * as BodyParser from "body-parser"
import { orderRouter } from "../routes/orderRouter"
import { productRouter } from "../routes/productRouter"
import { costumerRouter } from "../routes/costumerRouter"

const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use("/order", orderRouter)
app.use("/product", productRouter)
app.use("/costumer", costumerRouter)

app.listen(process.env.PORT, () => {
    console.log("Node server is running")
})