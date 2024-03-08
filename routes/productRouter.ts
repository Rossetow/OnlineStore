import express, { Request, Response } from 'express'
import * as productModel from "../models/product"
import { BasicProduct, Product } from '../types/product';

const productRouter = express.Router();

productRouter.get('/', async (req: Request, res: Response) => {
    productModel.findAll((err: Error, product: Product[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "dataOrders": product })
    })
})

productRouter.post('/', async (req: Request, res: Response) => {
    const newProduct: Product = req.body
    productModel.create(newProduct, (err: Error, id: number) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "product_id": id })
    })
})

productRouter.get('/:id', async (req: Request, res: Response) => {
    const productId: number = Number(req.params.id)
    productModel.findOne(productId, (err: Error, product: Product) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "dataProduct": product })
    })
})

productRouter.put('/:id', async (req: Request, res: Response) => {
    const product: Product = req.body
    productModel.update(product, (err: Error) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).send()
    })
})

productRouter.delete('/:id', async(req: Request, res: Response) => {
    const productId: number = Number(req.params.id)

    productModel.deleteOrder(productId, (err: Error) => {
        if(err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "message" : "Product deleted successfully" })
    })
})


export { productRouter }