import { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { UserDelete } from "./user-delete";
// const apiURL = process.env.API_URL || 'http://localhost:8080/';

export const UserUpdate = ({ updateUserInfo, user, token }) => {
  console.log(user);

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const apiURL = process.env.API_URL || "http://localhost:8080";

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
    };

    fetch(`${apiURL}/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Changing user data failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully changed user data");
          updateUserInfo(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Col md={6}>
        <Card className="mt-2">
          <Card.Body>
            <Card.Title>Update your info</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="5"
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="8"
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-light"
                />
              </Form.Group>
              <Button className="mt-3" variant="primary" type="submit">
                Submit
              </Button>
              <UserDelete />
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
