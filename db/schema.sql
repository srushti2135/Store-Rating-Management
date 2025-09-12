CREATE DATABASE fullstack_project;
USE fullstack_project;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(400),
  role ENUM('admin','user','store_owner') DEFAULT 'user'
);

CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  address VARCHAR(400),
  ownerId INT,
  FOREIGN KEY (ownerId) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  storeId INT,
  rating INT CHECK (rating >=1 AND rating <=5),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (storeId) REFERENCES stores(id) ON DELETE CASCADE
);

-- Seed admin
INSERT INTO users (name, email, password, role) VALUES ('Admin User','admin@example.com','$2a$10$hash','admin');