const express = require('express');
const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// 🔧 Set up disk storage for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads/' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ Handle form-data POST with file upload (admin only)
router.post('/', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    console.log('REQ BODY:', req.body);
    console.log('REQ FILE:', req.file);

    const { title, author, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const book = await Book.create({ title, author, description, image });
    res.status(201).json(book);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload' });
  }
});



// ✅ GET all books (all users)
router.get('/', verifyToken, async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// ✅ GET book by ID (protected route)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ PUT (admin only)
router.put('/:id', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, author, description } = req.body;
    let updateData = { title, author, description };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update book' });
  }
});


// ✅ DELETE (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
