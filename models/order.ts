import { BasicOrder, Order, OrderWithDetails } from "../types/order";
import { db } from "../dist/db";
import { OkPacket, RowDataPacket } from "mysql2"
import { callbackify } from "util";

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
            if (err) { callback(err) }
        }
    )
}

export const findOne = (orderId: number, callback: Function) => {
    const queryString = `
    SELECT 
        o.*,
        p.*,
        c.name AS costumer_name,
        c.email
    FROM Order AS o
    INNER JOIN Custumer AS c 
    ON c.id = o.costumer_id

    INNER JOIN Products AS p
    ON p.id = o.product_id

        WHERE o.order_id = ?
    `

    db.query(
        queryString, orderId, (err, result) => {
            if (err) { callback(err) }

            const row = (<RowDataPacket>result)[0]
            const order: OrderWithDetails = {
                orderId: row.order_id,
                costumer: {
                    id: row.costumer_id,
                    name: row.costumer_name,
                    email: row.email,
                },
                product: {
                    id: row.product_id,
                    name: row.name,
                    description: row.description,
                    inStock: row.inStock,
                    price: row.price
                },
                quantity: row.product_quantity
            }
            callback(null, order)
        }
    )
}