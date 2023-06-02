//Import
import { Link } from "react-router-dom"

//Import React Bootstrap
import {Nav, Navbar} from "react-bootstrap";

export const NavigationBar = ({user, onLoggedOut}) => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="position-fixed top-0 start-0 end-0" style={{zIndex: 1}}>
            <Navbar.Brand as={Link} to="/" className="ms-2">MyFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="container-fluid">
                    {!user && (
                        <>
                            <Nav.Link as={Link} to={`/`} className="navbar-link">
                            Home
                            </Nav.Link>
                            <Nav.Link as={Link} to={`/login`} className="ms-lg-auto me-3">Login</Nav.Link>
                            <Nav.Link as={Link} to={`/signup`}>Sign Up</Nav.Link>
                        </>
                    )}
                    {user && (
                        <>
                            <Nav.Link as={Link} to={`/`} className="navbar-link">
                            Home
                            </Nav.Link>
                            <Nav.Link as={Link} to={`/users`}>Profile</Nav.Link>
                            <Nav.Link onClick={onLoggedOut} className="ms-lg-auto">Logout</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}