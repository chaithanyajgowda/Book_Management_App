// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import ProtectedRoute from './ProtectedRoute';
import ReadBook from './components/ReadBook'; 
import UserManagement from './components/UserManagement';
import LandingPage from './components/LandingPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
    path="/home"
    element={
      <ProtectedRoute>
        <LandingPage />
      </ProtectedRoute>
    }
  />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <BookList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute role="admin">
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <EditBook />
            </ProtectedRoute>
          }
        />
        <Route
  path="/read/:id"
  element={
    <ProtectedRoute>
      <ReadBook />
    </ProtectedRoute>
  }
/>

        <Route
  path="users"
  element={
    <ProtectedRoute role="admin">
      <UserManagement />
    </ProtectedRoute>
  }
/>

      </Routes>
    </Router>
  );
}

export default App;

