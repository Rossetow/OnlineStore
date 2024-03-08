"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.findAll = exports.findOne = exports.update = exports.create = void 0;
const db_1 = require("../dist/db");
const create = (product, callback) => {
    const queryString = 'INSERT INTO Product (name, description, instock_quantity, price) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [
        product.id,
        product.description,
        product.inStock,
        product.price
    ], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const update = (product, callback) => {
    const queryString = `UPDATE Product SET name=?, description=?, instock_quantity=?, price=? WHERE id = ?`;
    db_1.db.query(queryString, [
        product.name,
        product.description,
        product.inStock,
        product.price,
        product.id
    ], (err, result) => {
        if (err) {
            callback(err);
        }
    });
};
exports.update = update;
const findOne = (productId, callback) => {
    const queryString = `
    SELECT 
        *
    FROM Product
    
    WHERE Product.id = ?
    `;
    db_1.db.query(queryString, productId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const product = {
            id: row.id,
            name: row.name,
            description: row.description,
            inStock: row.product_quantity,
            price: row.price
        };
        callback(null, product);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `SELECT * FROM Product`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const products = [];
        rows.forEach(row => {
            const product = {
                id: row.id,
                name: row.name,
                description: row.description,
                inStock: row.product_quantity,
                price: row.price
            };
            products.push(product);
        });
        callback(null, products);
    });
};
exports.findAll = findAll;
const deleteOrder = (productId, callback) => {
    const queryString = `DELETE FROM Product WHERE id=?`;
    db_1.db.query(queryString, [productId], (error, result) => {
        if (error) {
            callback(error);
        }
        else {
            callback(null);
        }
    });
};
exports.deleteOrder = deleteOrder;
