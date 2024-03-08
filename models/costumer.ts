import { BasicOrder } from "../types/order";
import { db } from "../dist/db";
import { OkPacket, RowDataPacket } from "mysql2"
import { callbackify } from "util";
import { error } from "console";
import { off } from "process";
import { BasicProduct, Product } from "../types/product";
import { Costumer } from "../types/costumer";

export const create = (costumer: Costumer, callback: Function) => {
    const queryString = 'INSERT INTO Costumer (name, password, email) VALUES (?, ?, ?)'

    db.query(
        queryString,
        [
            costumer.id,
            costumer.name,
            costumer.email,
            costumer.password
        ],
        (err, result) => {
            if (err) { callback(err) }

            const insertId = (<OkPacket>result).insertId
            callback(null, insertId)
        }
    )
}

export const update = (costumer: Costumer, callback: Function) => {
    const queryString = `UPDATE Costumer SET name=?, password=?, email=? WHERE id = ?`

    db.query(
        queryString,
        [
            costumer.name,
            costumer.password,
            costumer.email,
            costumer.id
        ],
        (err, result) => {
            if (err) { callback(err) }
        }
    )
}

export const findOne = (costumerId: number, callback: Function) => {
    const queryString = `
    SELECT 
        *
    FROM Costumer
    
    WHERE Costumer.id = ?
    `

    db.query(
        queryString, costumerId, (err, result) => {
            if (err) { callback(err) }

            const row = (<RowDataPacket>result)[0]
            const costumer: Costumer = {
                id: row.id,
                name: row.name,
                email: row.email,
                password: row.password,
            }
            callback(null, costumer)
        }
    )
}

export const findAll = (callback: Function) => {
    const queryString =
    `SELECT * FROM Costumer`

    db.query(
        queryString, (err, result) => {
            if (err) { callback(err) }

            const rows = <RowDataPacket[]>result
            const costumers: Costumer[] = []

            rows.forEach(row => {
                const costumer: Costumer = {
                    id: row.id,
                    name: row.name,
                    email: row.email,
                    password: row.password,
                }
                costumers.push(costumer)
            }
            )
            callback(null, costumers)
        }
    )
}

export const deleteOrder = (costumerId: number, callback: Function) => {
    const queryString = `DELETE FROM Costumer WHERE id=?`

    db.query(queryString, [costumerId], (error, result)=>{
        if(error) {
            callback(error)
        } else {
            callback(null)
        }
    })
}