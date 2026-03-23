const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "postgres-service",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin123",
  database: process.env.DB_NAME || "librarydb"
});

async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER
      )
    `);
  } catch (err) {
    console.error(err.message);
  }
}

initDb();

exports.getBooks = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, title, author, year FROM books ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getBookById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const result = await pool.query("SELECT id, title, author, year FROM books WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.addBook = async (req, res) => {
  const { title, author, year } = req.body || {};
  if (!title || !author) {
    return res.status(400).json({ message: "Missing title or author" });
  }

  const yearValue = year === undefined || year === null || year === "" ? null : Number(year);
  if (yearValue !== null && !Number.isFinite(yearValue)) {
    return res.status(400).json({ message: "Invalid year" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO books(title, author, year) VALUES($1,$2,$3) RETURNING id, title, author, year",
      [title, author, yearValue]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteBook = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const result = await pool.query("DELETE FROM books WHERE id=$1 RETURNING id", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
