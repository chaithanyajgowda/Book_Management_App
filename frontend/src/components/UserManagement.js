import React, { useEffect, useState } from 'react';
import axios from '../axios'; // Your axios instance with baseURL


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

 const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Fetching users with token:', token);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
    console.log('Users fetched:', res.data);
    setUsers(res.data);
  } catch (err) {
    console.error('Error fetching users:', err.response?.data || err.message);
  }
};

const updateRole = async (id, newRole) => {
  try {
    const token = localStorage.getItem('token');
    const res =  await axios.patch(`${process.env.REACT_APP_API_URL}/api/users/${id}/role`,
      { role: newRole },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMessage(res.data.message);
    fetchUsers(); // Refresh users
  }catch (err) {
  console.error('Update role error:', err.response?.data || err.message);
  setMessage(err.response?.data?.message || 'Failed to update role');
}

};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
   <div className="container mt-5">
      <div className="card shadow-lg">
        <div
          className="card-header text-white"
          style={{ backgroundColor: '#6f4e37' }} // Brown header
        >
          <h3 className="mb-0">👤 User Role Management</h3>
        </div>
        <div className="card-body" style={{ backgroundColor: '#f9f6f1' }}>
          {message && (
            <div className="alert alert-info" role="alert">
              {message}
            </div>
          )}
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead style={{ backgroundColor: '#d2b48c', color: '#3e2c1c' }}>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Current Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          u.role === 'admin' ? 'bg-success' : 'bg-secondary'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td>
                      {u.role === 'user' ? (
                        <button
                          className="btn btn-sm text-white"
                          style={{ backgroundColor: '#8b5e3c' }}
                          onClick={() => updateRole(u._id, 'admin')}
                        >
                          Promote to Admin
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm text-white"
                          style={{ backgroundColor: '#a0522d' }}
                          onClick={() => updateRole(u._id, 'user')}
                        >
                          Demote to User
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
