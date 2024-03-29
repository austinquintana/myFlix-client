import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login-view.scss";
// const apiURL = process.env.API_URL || 'http://localhost:8080';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const apiURL = process.env.API_URL || "http://localhost:8080";

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch(`${apiURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // add cors header -- every api call 
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <div className="login-form-container">
      <Card className="mt-5">
        <Card.Body>
          <Card.Title>Log in</Card.Title>
          <Form onSubmit={handleSubmit} className="mt-2">
            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={5}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={1}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-1">
              Login
            </Button>

            <Link to={`/signup`} className="px-3">
              {" "}
              Don't have an account? Register here!{" "}
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
