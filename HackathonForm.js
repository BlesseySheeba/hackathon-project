import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';

const HackathonForm = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');
  const [startDate, setStartDate] = useState(initialData.startDate || '');
  const [endDate, setEndDate] = useState(initialData.endDate || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [level, setLevel] = useState(initialData.level || 'easy');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, startDate, endDate, description, level });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField type="date" label="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} fullWidth />
      <TextField type="date" label="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} fullWidth />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
      <Select value={level} onChange={(e) => setLevel(e.target.value)}>
        <MenuItem value="easy">Easy</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="hard">Hard</MenuItem>
      </Select>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default HackathonForm;
