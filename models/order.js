"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.findAll = exports.findOne = exports.update = exports.create = void 0;
const db_1 = require("../dist/db");
const create = (order, callback) => {
    const queryString = 'INSERT INTO tOrder (product_id, customer_id, product_quantity) VALUES (?, ?, ?)';
    db_1.db.query(queryString, [
        order.product.id,
        order.costumer.id,
        order.quantity
    ], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const update = (order, callback) => {
    const queryString = `UPDATE Order SET product_id=?, product_quantity=? WHERE order_id = ?`;
    db_1.db.query(queryString, [
        order.product.id,
        order.quantity,
        order.orderId
    ], (err, result) => {
        if (err) {
            callback(err);
        }
    });
};
exports.update = update;
const findOne = (orderId, callback) => {
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
    `;
    db_1.db.query(queryString, orderId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const order = {
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
        };
        callback(null, order);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `
    SELECT 
        o.*,
        p.*,
        c.name AS costumer_name,
        c.email
    FROM ProductOrder AS o
    INNER JOIN Costumer AS c 
    ON c.id = o.costumer_id

    INNER JOIN Product AS p
    ON p.id = o.product_id
    `;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const orders = [];
        rows.forEach(row => {
            const order = {
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
            };
            orders.push(order);
        });
        callback(null, orders);
    });
};
exports.findAll = findAll;
const deleteOrder = (orderId, callback) => {
    const queryString = `DELETE FROM Order WHERE orderId=?`;
    db_1.db.query(queryString, [orderId], (error, result) => {
        if (error) {
            callback(error);
        }
        else {
            callback(null);
        }
    });
};
exports.deleteOrder = deleteOrder;
