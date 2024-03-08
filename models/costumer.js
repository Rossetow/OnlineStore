"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.findAll = exports.findOne = exports.update = exports.create = void 0;
const db_1 = require("../dist/db");
const create = (costumer, callback) => {
    const queryString = 'INSERT INTO Costumer (name, password, email) VALUES (?, ?, ?)';
    db_1.db.query(queryString, [
        costumer.id,
        costumer.name,
        costumer.email,
        costumer.password
    ], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const update = (costumer, callback) => {
    const queryString = `UPDATE Costumer SET name=?, password=?, email=? WHERE id = ?`;
    db_1.db.query(queryString, [
        costumer.name,
        costumer.password,
        costumer.email,
        costumer.id
    ], (err, result) => {
        if (err) {
            callback(err);
        }
    });
};
exports.update = update;
const findOne = (costumerId, callback) => {
    const queryString = `
    SELECT 
        *
    FROM Costumer
    
    WHERE Costumer.id = ?
    `;
    db_1.db.query(queryString, costumerId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const costumer = {
            id: row.id,
            name: row.name,
            email: row.email,
            password: row.password,
        };
        callback(null, costumer);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `SELECT * FROM Costumer`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const costumers = [];
        rows.forEach(row => {
            const costumer = {
                id: row.id,
                name: row.name,
                email: row.email,
                password: row.password,
            };
            costumers.push(costumer);
        });
        callback(null, costumers);
    });
};
exports.findAll = findAll;
const deleteOrder = (costumerId, callback) => {
    const queryString = `DELETE FROM Costumer WHERE id=?`;
    db_1.db.query(queryString, [costumerId], (error, result) => {
        if (error) {
            callback(error);
        }
        else {
            callback(null);
        }
    });
};
exports.deleteOrder = deleteOrder;
