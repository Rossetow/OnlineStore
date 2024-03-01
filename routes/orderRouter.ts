import express, { Request, Response } from 'express'
import * as orderModel from "../models/order"
import { Order, BasicOrder } from "../types/order"

const orderRouter = express.Router();

orderRouter.get('/', async (req: Request, res: Response) => {
    orderModel.findAll((err: Error, orders: Order[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "dataOrders": orders })
    })
})

orderRouter.post('/', async (req: Request, res: Response) => {
    const newOrder: BasicOrder = req.body
    orderModel.create(newOrder, (err: Error, order_id: number) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "order_id": order_id })
    })
})

orderRouter.get('/:id', async (req: Request, res: Response) => {
    const orderId: number = Number(req.params.id)
    orderModel.findOne(orderId, (err: Error, order: Order) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "dataOrders": order })
    })
})

orderRouter.put('/:id', async (req: Request, res: Response) => {
    const order: Order = req.body
    orderModel.update(order, (err: Error) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).send()
    })
})

orderRouter.delete('/:id', async(req: Request, res: Response) => {
    const orderId: number = Number(req.params.id)

    orderModel.deleteOrder(orderId, (err: Error) => {
        if(err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "message" : "Order deleted successfully" })
    })
})


export { orderRouter }