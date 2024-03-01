-- Create DB:

CREATE DATABASE OnlineStore;

-- Use DB:

USE OnlineStore;

-- Create product table

CREATE TABLE Product (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    description VARCHAR(50),
    instock_quantity INT,
    price DECIMAL(8, 2)
);

-- Create costumer table

CREATE TABLE Costumer (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    password VARCHAR(256),
    email VARCHAR(256) UNIQUE
);

-- Create order table

CREATE TABLE ProductOrder (
    order_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_id INT,
    costumer_id INT,
    product_quantity INT,
    CONSTRAINT FK_Product_Order
    FOREIGN KEY (product_id) REFERENCES Product(id),
    CONSTRAINT FK_Costumer_Order
    FOREIGN KEY (costumer_id) REFERENCES Costumer(id)
);

-- Data inserts


INSERT INTO Product (name, description, instock_quantity, price) 
VALUES ("Apple Macbook Pro", "15 inch, i7, 16GB RAM", 5, 667.00);

INSERT INTO Costumer (name, password, email)
VALUES ("Pedro", "jujutsukaisen", "pedrinhootaku@gmail.com");

INSERT INTO ProductOrder (product_id, costumer_id, product_quantity) VALUES (1, 1, 1);