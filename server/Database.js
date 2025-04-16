const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");

    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      hashedPassword TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      title TEXT,
      textBody TEXT
    )`);
  }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Check if username exists
app.get("/accounts", (req, res) => {
  db.get("SELECT username FROM accounts WHERE username = ?", [req.query.username], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      res.send(row ? true : false);
    }
  });
});

// Create new account
app.post("/newAccount", (req, res) => {
  db.run("INSERT INTO accounts (username, hashedPassword) VALUES (?, ?)", [req.body.username, req.body.hashedPassword], function(err) {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      console.log("New account created!");
      res.send();
    }
  });
});

// Login: get hashed password
app.get("/login", (req, res) => {
  db.get("SELECT hashedPassword FROM accounts WHERE username = ?", [req.query.username], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      res.send(row || {});
    }
  });
});

// Add new post
app.post("/newPost", (req, res) => {
  db.run("INSERT INTO posts (username, title, textBody) VALUES (?, ?, ?)", [req.body.username, req.body.title, req.body.textBody], function(err) {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      console.log("Post added!");
      res.send();
    }
  });
});

// Display all posts
app.get("/displayPosts", (req, res) => {
  db.all("SELECT * FROM posts ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      res.send(rows);
    }
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});