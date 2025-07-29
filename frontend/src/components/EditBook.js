import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    image: '', // will hold URL or new preview URL
  });

  const [selectedFile, setSelectedFile] = useState(null); // new image file if chosen
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/books/${id}`);
        setForm({
          title: res.data.title || '',
          author: res.data.author || '',
          description: res.data.description || '',
          image: res.data.image || '',
        });
      } catch (err) {
        console.error('Failed to fetch book:', err);
      }
    }
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // preview chosen image immediately
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setForm((prev) => ({ ...prev, image: previewUrl }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Update button clicked, submitting form...', form, selectedFile);

  try {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('author', form.author);
    formData.append('description', form.description);

    if (selectedFile) {
      formData.append('image', selectedFile); // new image
    } else {
      formData.append('image', form.image); // existing URL (optional depending on your backend handling)
    }

    const token = localStorage.getItem('token'); // ✅ get token from local storage

    await axios.put(`${process.env.REACT_APP_API_URL}/api/books/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, // ✅ send token here
      },
    });

   navigate('/book', { replace: true });

  } catch (err) {
    console.error('Failed to update book:', err.response?.data || err.message);
  }
};


  return (
   <div className="container mt-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
        <div
          className="card-header text-white"
          style={{ backgroundColor: '#6f4e37' }} // Brown header
        >
          <h4 className="mb-0">✏️ Edit Book</h4>
        </div>
        <div className="card-body" style={{ backgroundColor: '#f9f6f1' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter book title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                type="text"
                name="author"
                className="form-control"
                placeholder="Enter author name"
                value={form.author}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                placeholder="Enter book description"
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {form.image && (
              <div className="mb-3 text-center">
                <img
                  src={form.image}
                  alt="Book Preview"
                  className="img-thumbnail"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    border: '2px solid #8b5e3c',
                  }}
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Upload New Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn text-white"
                style={{ backgroundColor: '#8b5e3c' }}
              >
                🔄 Update Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBook;
