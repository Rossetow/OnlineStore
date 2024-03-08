import { BasicOrder } from "../types/order";
import { db } from "../dist/db";
import { OkPacket, RowDataPacket } from "mysql2"
import { callbackify } from "util";
import { error } from "console";
import { off } from "process";
import { BasicProduct, Product } from "../types/product";

export const create = (product: Product, callback: Function) => {
    const queryString = 'INSERT INTO Product (name, description, instock_quantity, price) VALUES (?, ?, ?, ?)'

    db.query(
        queryString,
        [
            product.id,
            product.description,
            product.inStock,
            product.price
        ],
        (err, result) => {
            if (err) { callback(err) }

            const insertId = (<OkPacket>result).insertId
            callback(null, insertId)
        }
    )
}

export const update = (product: Product, callback: Function) => {
    const queryString = `UPDATE Product SET name=?, description=?, instock_quantity=?, price=? WHERE id = ?`

    db.query(
        queryString,
        [
            product.name,
            product.description,
            product.inStock,
            product.price,
            product.id
        ],
        (err, result) => {
            if (err) { callback(err) }
        }
    )
}

export const findOne = (productId: number, callback: Function) => {
    const queryString = `
    SELECT 
        *
    FROM Product
    
    WHERE Product.id = ?
    `

    db.query(
        queryString, productId, (err, result) => {
            if (err) { callback(err) }

            const row = (<RowDataPacket>result)[0]
            const product: Product = {
                id: row.id,
                name: row.name,
                description: row.description,
                inStock: row.product_quantity,
                price: row.price
            }
            callback(null, product)
        }
    )
}

export const findAll = (callback: Function) => {
    const queryString =
    `SELECT * FROM Product`

    db.query(
        queryString, (err, result) => {
            if (err) { callback(err) }

            const rows = <RowDataPacket[]>result
            const products: Product[] = []

            rows.forEach(row => {
                const product: Product = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    inStock: row.product_quantity,
                    price: row.price
                }
                products.push(product)
            }
            )
            callback(null, products)
        }
    )
}

export const deleteOrder = (productId: number, callback: Function) => {
    const queryString = `DELETE FROM Product WHERE id=?`

    db.query(queryString, [productId], (error, result)=>{
        if(error) {
            callback(error)
        } else {
            callback(null)
        }
    })
}