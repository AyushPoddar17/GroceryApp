CREATE DATABASE IF NOT EXISTS `grocery`;

USE `grocery`

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Grocery (     
  id  INT primary key auto_increment,     
  Name varchar(255) NOT NULL,     
  Location varchar(255) NOT NULL,     
  Quantity int,     
  Unit varchar(255),     
  Price INT NOT NULl,
  CONSTRAINT grocery_loc Unique(Name, Location) 
);

CREATE TABLE orders (
    orderID INT AUTO_INCREMENT PRIMARY KEY,
    customerID INT NOT NULL,
    orderDate DATE NOT NULL,
    FOREIGN KEY (customerID) REFERENCES users(id)
);

CREATE TABLE orderDetails (
    orderID INT NOT NULL,
    productID INT NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (orderID, productID),
    FOREIGN KEY (orderID) REFERENCES orders(orderID),
    FOREIGN KEY (productID) REFERENCES Grocery(id)
);


INSERT INTO Grocery (Name, Location, Quantity, Unit, Price)
VALUES
("Potato","Banglore",500,"kg",100),
("Potato","Delhi",500,"kg",100),
("Onion","Banglore",500,"kg",100),
("Tomato","Banglore",500,"kg",100),
("Onion","Pune",500,"kg",100),
("Milk","Pune",500,"pcs",100),
("Tomato","Pune",500,"kg",100);



