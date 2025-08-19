CREATE DATABASE IF NOT EXISTS rn99_gemini;

USE rn99_gemini;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    address JSON,
    phone VARCHAR(255),
    website VARCHAR(255),
    company JSON
);

CREATE TABLE IF NOT EXISTS posts (
    id INT PRIMARY KEY,
    userId INT,
    title VARCHAR(255),
    body TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
);
