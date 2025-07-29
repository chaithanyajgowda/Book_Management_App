import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [form, setForm] = useState({ title: '', author: '', description: '' });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('author', form.author);
    formData.append('description', form.description);
    if (image) formData.append('image', image);

    await axios.post(`${process.env.REACT_APP_API_URL}/api/books`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    navigate('/book');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div
          className="card-header text-white"
          style={{ backgroundColor: '#6f4e37' }} // brown
        >
          <h3 className="mb-0">📚 Add Book</h3>
        </div>
        <div className="card-body" style={{ backgroundColor: '#f9f6f1' }}>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Author"
                  onChange={(e) =>
                    setForm({ ...form, author: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-12 mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Description"
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <div className="col-md-8 mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <button
                  type="submit"
                  className="btn text-white w-100"
                  style={{ backgroundColor: '#8b5e3c' }}
                >
                  ➕ Add Book
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;

