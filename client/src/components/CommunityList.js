import React, { useState, useEffect } from 'react';

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/communities');
      const data = await response.json();
      setCommunities(data);
    } catch (error) {
      console.error('Error fetching communities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `http://localhost:5000/communities/${editId}`
        : 'http://localhost:5000/communities';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchCommunities();
        setFormData({ name: '', location: '' });
        setIsEditing(false);
        setEditId(null);
      }
    } catch (error) {
      console.error('Error saving community:', error);
    }
  };

  const handleEdit = (community) => {
    setFormData({ name: community.name, location: community.location });
    setIsEditing(true);
    setEditId(community.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/communities/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) fetchCommunities();
    } catch (error) {
      console.error('Error deleting community:', error);
    }
  };

  return (
    <div className="community-list">
      <h2>Communities</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Community Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Community</button>
      </form>

      {loading ? (
        <p>Loading communities...</p>
      ) : (
        <div className="list">
          {communities.length === 0 ? (
            <p>No communities found.</p>
          ) : (
            communities.map((community) => (
              <div key={community.id} className="list-item">
                <div className="item-details">
                  <h3>{community.name}</h3>
                  <p>{community.location}</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleEdit(community)}>Edit</button>
                  <button onClick={() => handleDelete(community.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityList;
