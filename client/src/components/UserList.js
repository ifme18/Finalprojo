
import React, { useState, useEffect } from 'react';
import "./Users.css"

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    phoneno: '',
    houseno: '',
    community_id: ''
  });

  useEffect(() => {
    fetchUsers();
    fetchCommunities();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCommunities = async () => {
    try {
      const response = await fetch('http://localhost:5000/communities');
      const data = await response.json();
      setCommunities(data);
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchUsers();
        setFormData({
          name: '',
          email: '',
          occupation: '',
          phoneno: '',
          houseno: '',
          community_id: ''
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-list">
      <h2>Users</h2>
      
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Occupation"
          value={formData.occupation}
          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phoneno}
          onChange={(e) => setFormData({ ...formData, phoneno: e.target.value })}
        />
        <input
          type="text"
          placeholder="House Number"
          value={formData.houseno}
          onChange={(e) => setFormData({ ...formData, houseno: e.target.value })}
        />
        <select
          value={formData.community_id}
          onChange={(e) => setFormData({ ...formData, community_id: e.target.value })}
          required
        >
          <option value="">Select Community</option>
          {communities.map((community) => (
            <option key={community.id} value={community.id}>
              {community.name}
            </option>
          ))}
        </select>
        <button type="submit">Add User</button>
      </form>

      <div className="list">
        {users.map((user) => (
          <div key={user.id} className="list-item">
            <div className="item-details">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              {user.occupation && <p>Occupation: {user.occupation}</p>}
              {user.phoneno && <p>Phone: {user.phoneno}</p>}
              {user.houseno && <p>House #: {user.houseno}</p>}
              <p>Community ID: {user.community_id}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;