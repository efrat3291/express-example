const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
const PORT = 3000;

let books = [
    { id: uuidv4(), title: "Book 1" },
    { id: uuidv4(), title: "Book 2" },
    { id: uuidv4(), title: "Book 3" },
];

app.use(express.json());

app.get("/books", (req, res) => {
    res.json(books);
})

app.get("/books/:id", (req, res) => {
    const book = books.find((b) => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
})

app.post("/books", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    const newBook = { id: uuidv4(), title };
    books.push(newBook);
    res.status(201).json(newBook);
})

app.patch("/books/:id", (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const book = books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    if (title) {
        book.title = title;
    }

    res.json(book);
})

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const deleted = books.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});