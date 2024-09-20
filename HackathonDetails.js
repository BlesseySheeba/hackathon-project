import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HackathonDetails = ({ hackathons, deleteHackathon, editHackathon }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hackathon = hackathons.find(h => h.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [updatedHackathon, setUpdatedHackathon] = useState(hackathon || {});

  useEffect(() => {
    if (hackathon) {
      setUpdatedHackathon({ ...hackathon });
    }
  }, [hackathon]);

  if (!hackathon) return <p>Hackathon not found!</p>;

  const handleEditChange = (e) => {
    setUpdatedHackathon({
      ...updatedHackathon,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    editHackathon(hackathon.id, updatedHackathon);
    setIsEditing(false);
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the main page
  };

  return (
    <div className="hackathon-detail">
      <h2 className="hackathon-title">{hackathon.name}</h2>
      <img
        src={hackathon.image}
        alt={hackathon.name}
        className="hackathon-detail-image"
      />
      <h3 className="overview-title">Overview</h3>
      <p className="hackathon-overview">
        Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word "Lepidoptera" means "Scaly Wings" in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows.
      </p>
      <p>
        An agency of the Government Wildlife Conservation is planning to implement an automated system based on computer vision so that it can identify butterflies based on captured images. As a consultant for this project, you are responsible for developing an efficient model.
      </p>
      <p>
        Your task is to build an image classification model using CNN that classifies to which class of weather each image belongs.
      </p>

      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="name"
            value={updatedHackathon.name}
            onChange={handleEditChange}
            placeholder="Hackathon Name"
          />
          <input
            type="date"
            name="startDate"
            value={updatedHackathon.startDate}
            onChange={handleEditChange}
          />
          <input
            type="date"
            name="endDate"
            value={updatedHackathon.endDate}
            onChange={handleEditChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="action-buttons">
          <p>Start Date: {hackathon.startDate}</p>
          <p>End Date: {hackathon.endDate}</p>
          <button onClick={() => deleteHackathon(hackathon.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleBack}>Back to Hackathons</button>
        </div>
      )}
    </div>
  );
};

export default HackathonDetails;
