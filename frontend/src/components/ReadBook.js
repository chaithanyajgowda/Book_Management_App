import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

const ReadBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error('❌ Error fetching book:', error);
      }
    }

    fetchBook();
  }, [id]);

  if (!book) return <div className="text-center mt-5">Loading book details...</div>;

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div
        className="p-4"
        style={{
          backgroundColor: '#fff8f0',
          border: '2px solid #dcb190',
          borderRadius: '20px',
          maxWidth: '720px',
          width: '100%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Title */}
        <h2 className="text-center fw-bold mb-2" style={{ color: '#5e3b1e' }}>
          {book.title}
        </h2>

        {/* Author */}
        <p className="text-center text-muted mb-4" style={{ fontStyle: 'italic' }}>
          by {book.author}
        </p>

        {/* Cover Image */}
        {book.image && (
          <div className="text-center mb-4">
            <img
              src={`http://localhost:5000${book.image}`}
              alt="Book cover"
              style={{
                width: '70%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            />
          </div>
        )}

        {/* Description */}
        <p
          style={{
            fontSize: '1rem',
            color: '#4b2e1a',
            textAlign: 'justify',
            lineHeight: '1.7',
          }}
        >
          {book.description}
        </p>

        {/* Like Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-danger px-3 py-1 rounded-pill"
            style={{ backgroundColor: '#b04c34', border: 'none' }}
          >
            <i className="bi bi-heart-fill me-1"></i> Like
          </button>
          <span className="ms-2 text-danger">1 Likes</span>
        </div>

        {/* Comments Section */}
        <div
          className="mt-5 p-3"
          style={{
            backgroundColor: '#fff2e6',
            border: '1px solid #fac090',
            borderRadius: '12px',
          }}
        >
          <h5 className="fw-bold text-center mb-3" style={{ color: '#8B4513' }}>
            Comments
          </h5>
          <textarea
            className="form-control mb-2"
            rows="3"
            placeholder="Write a comment..."
            style={{ borderRadius: '12px' }}
          ></textarea>
          <div className="text-end">
            <button className="btn btn-warning rounded-pill px-4">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadBook;

