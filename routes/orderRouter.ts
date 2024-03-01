import express, { Request, Response }from 'express'
import * as orderModel from "../models/order"
import { Order, BasicOrder } from "../types/order"

const orderRouter = express.Router()