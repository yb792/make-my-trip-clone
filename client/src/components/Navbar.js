import { Link } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = () => {
  return (
    <BSNavbar bg="primary" variant="dark" expand="lg">
      <Container>
        <BSNavbar.Brand as={Link} to="/">MakeMyTrip Clone</BSNavbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/flights">Flights</Nav.Link>
          <Nav.Link as={Link} to="/hotels">Hotels</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link as={Link} to="/user-bookings">User Bookings</Nav.Link>
          <Nav.Link as={Link} to="/admin/login">Admin</Nav.Link>
          {localStorage.getItem('adminToken') && (
            <Nav.Link as={Link} to="/admin/dashboard">Admin Dashboard</Nav.Link>
          )}
        </Nav>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
