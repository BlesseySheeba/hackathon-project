import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';

const HackathonCard = ({ hackathon, onClick }) => {
  const now = dayjs();
  const isActive = now.isAfter(hackathon.startDate) && now.isBefore(hackathon.endDate);
  const isUpcoming = now.isBefore(hackathon.startDate);

  return (
    <Card
      onClick={onClick}
      style={{
        marginBottom: '20px',
        cursor: 'pointer',
        height: '250px', // Consistent height for all cards
      }}
    >
      <CardContent>
        <Typography variant="h5">{hackathon.name}</Typography>
        <Typography variant="body2">{hackathon.description}</Typography>
        <Typography variant="body2">
          Level: {hackathon.level} | Status: {isActive ? 'Active' : isUpcoming ? 'Upcoming' : 'Past'}
        </Typography>
        {isActive && (
          <Typography variant="body2">
            Time Left: {dayjs(hackathon.endDate).diff(now, 'day')} days
          </Typography>
        )}
        {isUpcoming && (
          <Typography variant="body2">
            Starts in: {dayjs(hackathon.startDate).diff(now, 'day')} days
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default HackathonCard;
