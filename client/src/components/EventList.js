
import React, { useState, useEffect } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [formData, setFormData] = useState({
    eventname: '',
    eventdate: '',
    community_id: ''
  });

  useEffect(() => {
    fetchEvents();
    fetchCommunities();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
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
      const response = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchEvents();
        setFormData({
          eventname: '',
          eventdate: '',
          community_id: ''
        });
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/events/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="event-list">
      <h2>Events</h2>
      
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Event Name"
          value={formData.eventname}
          onChange={(e) => setFormData({ ...formData, eventname: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={formData.eventdate}
          onChange={(e) => setFormData({ ...formData, eventdate: e.target.value })}
          required
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
        <button type="submit">Add Event</button>
      </form>

      <div className="list">
        {events.map((event) => (
          <div key={event.id} className="list-item">
            <div className="item-details">
              <h3>{event.eventname}</h3>
              <p>Date: {new Date(event.eventdate).toLocaleString()}</p>
              <p>Community ID: {event.community_id}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;