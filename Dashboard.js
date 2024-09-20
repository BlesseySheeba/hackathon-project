import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ hackathons, deleteHackathon, editHackathon }) => {
  const getStatus = (startDate, endDate) => {
    const now = new Date();
    if (new Date(startDate) > now) return 'Upcoming';
    if (new Date(endDate) < now) return 'Past';
    return 'Active';
  };

  return (
    <div className="dashboard">
      {hackathons.map((hackathon) => (
        <div key={hackathon.id} className="hackathon-card">
          <Link to={`/hackathon/${hackathon.id}`}>
            <img
              src={hackathon.image}
              alt={hackathon.name}
              className="hackathon-image"
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h2>{hackathon.name}</h2>
            <p>Start Date: {hackathon.startDate}</p>
            <p>End Date: {hackathon.endDate}</p>
            <p>Status: {getStatus(hackathon.startDate, hackathon.endDate)}</p>
          </Link>
          <div className="button-group">
            <button onClick={() => editHackathon(hackathon.id)}>Edit</button>
            <button onClick={() => deleteHackathon(hackathon.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
