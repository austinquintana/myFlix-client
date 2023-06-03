import { useState } from "react";

//import react-bootstrap
import {Form, Button, FormGroup, Row, Col} from "react-bootstrap";

export const ProfileDeleteView = ({user, token, onDelete}) => {
    const [controlUsername, setControlUsername] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault()
        if (controlUsername === user.Username) {
            fetch(`https://myflix-5sws.onrender.com/users/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: "DELETE"
            }).then((result) => {
                alert (`Account is successfully deleted`)
                localStorage.setItem("user", null)
                localStorage.setItem("token", null)
                onDelete(result.user, result.token)

            }).catch((err) => {
                alert("Something went wrong" + err)
            })
        } else {
            alert("Wrong username added")
        }
    }

    return(
        <Form onSubmit={handleSubmit} className="mt-2">
            <Row>
                <Col sm={{offset: 2}} md={{offset: 4}} className="fw-bold fs-5 align-self-center mb-3">Delete account: </Col>
            </Row>
            <Row className="mb-3">
                <FormGroup controlId="fromControlDelete" as={Col} sm={{offset: 2}} md={{offset: 4}}>
                    <Form.Label>Enter your username:</Form.Label>
                    <Form.Control 
                        className="text-bg-dark"
                        type="text"
                        value={controlUsername}
                        onChange={(e) => setControlUsername(e.target.value)}
                        required
                        placeholder="Enter your username"
                    />
                </FormGroup>
                <Col sm={{offset: 1}} md={{offset: 3}} className="desktop desktop-long"></Col>
            </Row>
            <Row className="mb-3">
                <Col sm={{offset: 2}} md={{offset: 4}} >
                    <Button variant="primary" type="submit">Submit</Button>
                </Col>
            </Row>
        </Form>
    )
}