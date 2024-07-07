const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// database connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Mugisha123@#', 
    database: 'library'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Add a new book
app.post('/books', (req, res) => {
    const { title, author, genre, year_of_publication } = req.body;
    const sql = 'INSERT INTO books (title, author, genre, year_of_publication) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, author, genre, year_of_publication], (err, result) => {
        if (err) throw err;
        res.send('Book added');
    });
});

// View all books
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update a book
app.put('/books/:id', (req, res) => {
    const { title, author, genre, year_of_publication } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE books SET title = ?, author = ?, genre = ?, year_of_publication = ? WHERE id = ?';
    db.query(sql, [title, author, genre, year_of_publication, id], (err, result) => {
        if (err) throw err;
        res.send('Book updated');
    });
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM books WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Book deleted');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});