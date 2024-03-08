import express, { Request, Response } from 'express'
import * as costumerModel from "../models/costumer"
import { BasicProduct, Product } from '../types/product';
import { Costumer } from '../types/costumer';

const costumerRouter = express.Router();

costumerRouter.get('/', async (req: Request, res: Response) => {
    costumerModel.findAll((err: Error, costumer: Costumer[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "dataCostumer": costumer })
    })
})

costumerRouter.post('/', async (req: Request, res: Response) => {
    const newCostumer: Costumer = req.body
    costumerModel.create(newCostumer, (err: Error, id: number) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "costumer_id": id })
    })
})

costumerRouter.get('/:id', async (req: Request, res: Response) => {
    const costumer: number = Number(req.params.id)
    costumerModel.findOne(costumer, (err: Error, costumer: Costumer) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "costumerProduct": costumer })
    })
})

costumerRouter.put('/:id', async (req: Request, res: Response) => {
    const costumer: Costumer = req.body
    costumerModel.update(costumer, (err: Error) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).send()
    })
})

costumerRouter.delete('/:id', async(req: Request, res: Response) => {
    const costumer: number = Number(req.params.id)

    costumerModel.deleteOrder(costumer, (err: Error) => {
        if(err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "message" : "Product deleted successfully" })
    })
})


export { costumerRouter }