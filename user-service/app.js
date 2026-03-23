const express = require('express');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);
    console.log("users table is ready");
  } catch (err) {
    console.error("Failed to init DB schema:", err.message);
  }
}

initDb();

async function seedAdmin() {
  try {
    const adminEmail = 'admin@bibliotheque.com';
    const checkAdmin = await pool.query('SELECT * FROM users WHERE email=$1', [adminEmail]);
    
    if (checkAdmin.rows.length === 0) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await pool.query(
        'INSERT INTO users(name, email, password) VALUES($1, $2, $3)',
        ['Admin Library', adminEmail, passwordHash]
      );
      console.log("Admin account seeded successfully");
    }
  } catch (err) {
    console.error("Failed to seed admin:", err.message);
  }
}

seedAdmin();

app.get('/', (req, res) => {
  res.send("User Service is running");
});

app.get('/users', (req, res) => {
  res.send("User Service is running");
});

const BOOK_SERVICE_URL = process.env.BOOK_SERVICE_URL || "http://book-service:2600/api/books";

const fetchBooksHandler = async (req, res) => {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), 5000);

  try {
    const response = await fetch(BOOK_SERVICE_URL, { signal: abortController.signal });

    if (!response.ok) {
      return res.status(502).json({ message: "Failed to fetch books from book-service" });
    }

    const books = await response.json();
    res.json({ books });
  } catch (err) {
    const errorMessage = err?.name === "AbortError" ? "Timeout while calling book-service" : err?.message;
    res.status(502).json({ message: "Book service unreachable", error: errorMessage });
  } finally {
    clearTimeout(timeoutId);
  }
};

app.get('/books', fetchBooksHandler);
app.get('/users/books', fetchBooksHandler);

const registerHandler = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id, name, email',
      [name, email, passwordHash]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

app.post('/register', registerHandler);
app.post('/users/register', registerHandler);

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json("Invalid credentials");
    }

    const user = result.rows[0];
    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(401).json("Invalid credentials");
    }

    const jwtSecret = process.env.JWT_SECRET || "change-me";
    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: "2h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

app.post('/login', loginHandler);
app.post('/users/login', loginHandler);

app.listen(2700, () => {
  console.log("User service running on port 2700");
});
