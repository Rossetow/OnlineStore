import { BasicOrder, Order, OrderWithDetails } from "../types/order";
import { db } from "../dist/db";
import { OkPacket, RowDataPacket } from "mysql2"

export const create = (order:BasicOrder, callback: Function) => {
    const queryString = 'INSERT INTO tOrder (product_id, customer_id, product_quantity) VALUES (?, ?, ?)'

    db.query(
        queryString,
        [
            order.product.id,
            order.costumer.id,
            order.quantity
        ],
        (err, result) => {
            if (err) { callback(err) }

            const insertId = (<OkPacket>result).insertId
            callback(null, insertId)
        }
    )
}