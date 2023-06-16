import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from'react-router-dom';
import './signup-view.scss';
// const apiURL = process.env.API_URL || 'http://localhost:8080/';

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ controlPassword, setControlPassword ] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const apiURL = process.env.API_URL || 'http://localhost:8080';
    
    const handleSubmit = event => {
        event.preventDefault();

        if (password!== controlPassword) {
            alert("Passwords do not match");
            return;
        }
        
        const data = {
            Username: username,
            Password: password,
            ControlPassword: controlPassword,
            Email: email,
        }

        fetch(`${apiURL}/users`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => {
            if (response.ok) {
                alert("Signup successful");
                window.location.replace("/login");
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <div className="sign-up-container">
            <Card className="mt-2 mb-3">
                <Card.Body>
                    <Card.Title>Sign up</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                minLength="5"
                                 className="bg-light"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                             <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength="1"
                                className="bg-light"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Enter password again:</Form.Label>
                            <Form.Control
                                type="password"
                                value={controlPassword}
                                onChange={(e) => setControlPassword(e.target.value)}
                                required
                                placeholder="Enter your password again"
                                className="bg-light"
                            />
                        </Form.Group>
                         <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="bg-light"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birthdate:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthdate}
                                onChange={e => setBirthdate(e.target.value)}
                                required
                                className="bg-light"
                            />
                        </Form.Group>
                        <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                        <Link to={`/login`} className="px-3 "> Already have an account? Login here! </Link>
                    </Form>
                 </Card.Body>
            </Card>
        </div>
    );
};