import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateHackathon from './pages/CreateHackathon';
import HackathonDetails from './pages/HackathonDetails';
import './App.css';

const App = () => {
  const predefinedHackathons = useMemo(() => [
    { id: 1, name: 'Hackathon 1', startDate: '2024-09-20', endDate: '2024-09-27', level: 'easy', image: require('./assets/images/Group 1000002766.png') },
    { id: 2, name: 'Hackathon 2', startDate: '2024-10-01', endDate: '2024-10-05', level: 'medium', image: require('./assets/images/Group 1000002466.png') },
    { id: 3, name: 'Hackathon 3', startDate: '2024-10-10', endDate: '2024-10-15', level: 'hard', image: require('./assets/images/Group 1000002773.png') },
    { id: 4, name: 'Hackathon 4', startDate: '2024-10-20', endDate: '2024-10-25', level: 'easy', image: require('./assets/images/Group 1000002766.png') },
    { id: 5, name: 'Hackathon 5', startDate: '2024-11-01', endDate: '2024-11-05', level: 'medium', image: require('./assets/images/Group 1000002466.png') },
    { id: 6, name: 'Hackathon 6', startDate: '2024-11-10', endDate: '2024-11-15', level: 'hard', image: require('./assets/images/Group 1000002773.png') },
  ], []);

  const [hackathons, setHackathons] = useState(predefinedHackathons);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const savedHackathons = JSON.parse(localStorage.getItem('hackathons')) || [];
    const combinedHackathons = [...predefinedHackathons, ...savedHackathons];
    const uniqueHackathons = Array.from(new Map(combinedHackathons.map(hack => [hack.id, hack])).values());
    setHackathons(uniqueHackathons);
  }, [predefinedHackathons]);

  const addHackathon = (newHackathon) => {
    const newId = hackathons.length ? Math.max(hackathons.map(h => h.id)) + 1 : 1;
    const updatedHackathons = [...hackathons, { ...newHackathon, id: newId }];
    setHackathons(updatedHackathons);
    localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));
  };

  const deleteHackathon = (id) => {
    const updatedHackathons = hackathons.filter(h => h.id !== id);
    setHackathons(updatedHackathons);
    localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));
  };

  const editHackathon = (id, updatedHackathon) => {
    const updatedHackathons = hackathons.map(h => 
      h.id === id ? { ...h, ...updatedHackathon } : h
    );
    setHackathons(updatedHackathons);
    localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));
  };

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === '' || hackathon.level === selectedLevel;
    const matchesStatus = selectedStatus === '' || 
      (selectedStatus === 'Active' && new Date(hackathon.startDate) <= new Date() && new Date(hackathon.endDate) >= new Date()) ||
      (selectedStatus === 'Upcoming' && new Date(hackathon.startDate) > new Date()) ||
      (selectedStatus === 'Past' && new Date(hackathon.endDate) < new Date());
    return matchesSearch && matchesLevel && matchesStatus;
  });

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Hackathons</h1>
                <div className="search-bar-container" style={{ textAlign: 'center' }}>
                  <input
                    type="text"
                    placeholder="Search Hackathons"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filters" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                  <div style={{ marginRight: '20px' }}>
                    <h4 style={{ margin: '0' }}>Level:</h4>
                    {['easy', 'medium', 'hard'].map(level => (
                      <label key={level} style={{ display: 'block' }}>
                        <input
                          type="radio"
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level)}
                        />
                        {level}
                      </label>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ margin: '0' }}>Status:</h4>
                    {['Active', 'Upcoming', 'Past'].map(status => (
                      <label key={status} style={{ display: 'block' }}>
                        <input
                          type="radio"
                          checked={selectedStatus === status}
                          onChange={() => setSelectedStatus(status)}
                        />
                        {status}
                      </label>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <Link to="/create-hackathon">
                    <button>Create Hackathon</button>
                  </Link>
                </div>
                <Dashboard
                  hackathons={filteredHackathons}
                  deleteHackathon={deleteHackathon}
                  editHackathon={editHackathon}
                />
              </>
            }
          />
          <Route
            path="/create-hackathon"
            element={<CreateHackathon addHackathon={addHackathon} />}
          />
          <Route
            path="/hackathon/:id"
            element={<HackathonDetails hackathons={hackathons} deleteHackathon={deleteHackathon} editHackathon={editHackathon} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
