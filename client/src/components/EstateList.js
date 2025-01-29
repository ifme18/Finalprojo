
import React, { useState, useEffect } from 'react';

const EstateList = () => {
  const [estates, setEstates] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    estatename: '',
    user_id: '',
    community_id: ''
  });

  useEffect(() => {
    fetchEstates();
    fetchCommunities();
    fetchUsers();
  }, []);

  const fetchEstates = async () => {
    try {
      const response = await fetch('http://localhost:5000/estates');
      const data = await response.json();
      setEstates(data);
    } catch (error) {
      console.error('Error fetching estates:', error);
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

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/estates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchEstates();
        setFormData({
          estatename: '',
          user_id: '',
          community_id: ''
        });
      }
    } catch (error) {
      console.error('Error creating estate:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/estates/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchEstates();
      }
    } catch (error) {
      console.error('Error deleting estate:', error);
    }
  };

  return (
    <div className="estate-list">
      <h2>Estates</h2>
      
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Estate Name"
          value={formData.estatename}
          onChange={(e) => setFormData({ ...formData, estatename: e.target.value })}
          required
        />
        <select
          value={formData.user_id}
          onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
          required
        >
          <option value="">Select Owner</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
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
        <button type="submit">Add Estate</button>
      </form>

      <div className="list">
        {estates.map((estate) => (
          <div key={estate.id} className="list-item">
            <div className="item-details">
              <h3>{estate.estatename}</h3>
              <p>Owner ID: {estate.user_id}</p>
              <p>Community ID: {estate.community_id}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => handleDelete(estate.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstateList;