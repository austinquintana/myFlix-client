import React from "react";
import { Card } from 'react-bootstrap';

export const UserInfo = ({ user }) => {
  
  return (
    <Card style={{backgroundColor: 'Darkgray'}}>
      <Card.Body>
        <Card.Title className="profile-title" style={{color: '#194545'}}>User Info</Card.Title>
        <Card.Text className="profile-text">
          <span className="label">Username: </span>
          <span className="value">{user.Username}</span>
        </Card.Text>
        <Card.Text className="profile-text">
          <span className="label">Email: </span>
          <span className="value">{user.Email}</span>
        </Card.Text>
        </Card.Body>
    </Card>
  );
}