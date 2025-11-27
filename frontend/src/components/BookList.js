// src/components/BookList.js
import React, { useEffect, useState,} from 'react';
import axios from '../axios';
import { useNavigate, useLocation } from 'react-router-dom';

function BookList() {
  console.log(" BookList component mounted");
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [role, setRole] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/books`);
        console.log(" Books fetched:", res.data);
        setBooks(res.data);
      } catch (error) {
        console.error(" Error fetching books:", error);
      }
    }

    async function fetchRole() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`);
        console.log(" Role fetched:", res.data.role);
        setRole(res.data.role);
      } catch (error) {
        console.error(" Error fetching role:", error);
      }
    }

  
  fetchBooks();
  fetchRole();
}, [location.key]);
 


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error(" Error deleting book:", error);
    }
  };

  // Optional fallback while loading
  if (!role) return <p> Loading role...</p>;
  if (!books.length) return <p> No books found or still loading...</p>;

  return (
   <div className="container my-5" style={{
    backgroundColor: '#f5f0e6',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
  }}>
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold" style={{ color: '#8B4513' }}>
      <i className="bi bi-book-half me-2"></i>Book Collection
    </h2>
    <div>
      

      {role === 'admin' && (
        <button className="btn btn-success me-2" onClick={() => navigate('/add')}>
          <i className="bi bi-plus-circle me-1"></i> Add Book
        </button>
      )}
     {role === 'admin' && (
  <button className="btn btn-dark" onClick={() => navigate('/users')}>
    <i className="bi bi-people-fill me-1"></i> Manage Users
  </button>
)}

    </div>
  </div>

  <div className="row">
    {books.map(book => (
      <div className="col-md-6 col-lg-4 mb-4" key={book._id}>
        <div className="card h-100 border-0 shadow-lg rounded-4 position-relative overflow-hidden">

          {/* Brown top border */}
          <div
            className="position-absolute top-0 start-0 w-100"
            style={{
              height: '6px',
              backgroundColor: '#8B4513',
              borderTopLeftRadius: '0.5rem',
              borderTopRightRadius: '0.5rem'
            }}
          ></div>

          {/* Book image */}
          {book.image && (
            <img
              src={`http://localhost:5000${book.image}`}
              alt={book.title}
              className="card-img-top rounded-top"
              style={{ objectFit: 'cover', height: '240px' }}
            />
          )}

          <div className="card-body d-flex flex-column">
            <h5 className="card-title fw-bold" style={{ color: '#8B4513' }}>
              {book.title}
            </h5>
            <p className="text-muted mb-1">
              <i className="bi bi-person-fill me-1"></i>by {book.author}
            </p>
            {book.description && (
              <p className="text-secondary small">
                <i className="bi bi-file-text me-1"></i>{book.description}
              </p>
            )}
        <div className="text-center mt-2">
  <button
    className="btn btn-sm"
    style={{
      backgroundColor: '#8B4513',     // Brown background
      color: 'white',                 // White text
      width: '80px',                  // Smaller fixed width
      fontSize: '0.75rem',            // Smaller font
      padding: '4px 8px',             // Tight padding
      borderRadius: '20px'            // Rounded pill look
    }}
    onClick={() => navigate(`/read/${book._id}`)}
  >
    <i className="bi bi-book me-1"></i>Read
  </button>
</div>


            {role === 'admin' && (
              <div className="mt-auto d-flex justify-content-between">
                <button
                  className="btn btn-outline-primary btn-sm px-3 rounded-pill"
                  onClick={() => navigate(`/edit/${book._id}`)}
                >
                  <i className="bi bi-pencil-fill me-1"></i>Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm px-3 rounded-pill"
                  onClick={() => handleDelete(book._id)}
                >
                  <i className="bi bi-trash3-fill me-1"></i>Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


  )
}
export default BookList;
