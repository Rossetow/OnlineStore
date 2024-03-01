import { BasicOrder, Order, OrderWithDetails } from "../types/order";
import { db } from "../dist/db";
import { OkPacket, RowDataPacket } from "mysql2"

export const create = (order: BasicOrder, callback: Function) => {
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

export const update = (order: Order, callback: Function) => {
    const queryString = `UPDATE Order SET product_id=?, product_quantity=? WHERE order_id = ?`

    db.query(
        queryString,
        [
            order.product.id,
            order.quantity,
            order.orderId
        ],
        (err, result) => {
            if(err) { callback(err) }
        }
    )
}