
import React, { useState, useEffect } from 'react';
import './App.css';
import EstateList from './EstateList';
import CommunityList from './CommunityList';
import EventList from './EventList';

import UserList from './UserList';

const App = () => {
  const [activeTab, setActiveTab] = useState('communities');

  return (
    <div className="app">
      <header className="header">
        <h1>Community Management System</h1>
        <nav className="nav">
          <button 
            className={`nav-button ${activeTab === 'communities' ? 'active' : ''}`}
            onClick={() => setActiveTab('communities')}
          >
            Communities
          </button>
          <button 
            className={`nav-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={`nav-button ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={`nav-button ${activeTab === 'estates' ? 'active' : ''}`}
            onClick={() => setActiveTab('estates')}
          >
            Estates
          </button>
        </nav>
      </header>
      
      <main className="main">
        {activeTab === 'communities' && <CommunityList />}
        {activeTab === 'users' && <UserList />}
        {activeTab === 'events' && <EventList />}
        {activeTab === 'estates' && <EstateList />}
      </main>
    </div>
  );
};

export default App;