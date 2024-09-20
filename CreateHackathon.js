import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateHackathon = ({ addHackathon }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [level, setLevel] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && startDate && endDate && level) {
      const newHackathon = {
        id: Date.now(),
        name,
        startDate,
        endDate,
        level,
        image: image ? URL.createObjectURL(image) : null,
      };

      // Save to local storage
      const updatedHackathons = JSON.parse(localStorage.getItem('hackathons')) || [];
      updatedHackathons.push(newHackathon);
      localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));

      // Update the state in the parent component
      addHackathon(newHackathon);

      // Reset form fields after submission
      setName('');
      setStartDate('');
      setEndDate('');
      setLevel('');
      setImage(null);

      // Redirect to the new hackathon details page
      navigate(`/hackathon/${newHackathon.id}`);
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="create-hackathon-page">
      <div className="create-hackathon-container">
        <h2>Create a New Hackathon</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ display: 'block', marginBottom: '10px' }}
            />
          </label>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ display: 'block', marginBottom: '10px' }}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ display: 'block', marginBottom: '10px' }}
            />
          </label>
          <label>
            Level:
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="radio"
                  value="Easy"
                  checked={level === 'Easy'}
                  onChange={() => setLevel('Easy')}
                /> Easy
              </label>
              <label>
                <input
                  type="radio"
                  value="Medium"
                  checked={level === 'Medium'}
                  onChange={() => setLevel('Medium')}
                /> Medium
              </label>
              <label>
                <input
                  type="radio"
                  value="Hard"
                  checked={level === 'Hard'}
                  onChange={() => setLevel('Hard')}
                /> Hard
              </label>
            </div>
          </label>
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ display: 'block', marginBottom: '10px' }}
            />
          </label>
          <button type="submit" style={{ display: 'block', margin: '0 auto' }}>Create Hackathon</button>
        </form>
      </div>
    </div>
  );
};

export default CreateHackathon;
