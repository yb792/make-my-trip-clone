import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Modal, Form, Row, Col } from "react-bootstrap";

const ManageFlights = () => {
  const [flights, setFlights] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    airline: "",
    from: "",
    to: "",
    departureDate: "",
    departureTime: "00:00",
    arrivalTime: "00:00",
    price: "",
  });
  const [editId, setEditId] = useState(null);

  const formatTimeAMPM = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":");
    const h = parseInt(hour, 10);
    const suffix = h >= 12 ? "PM" : "AM";
    const adjustedHour = h % 12 || 12;
    return `${adjustedHour}:${minute} ${suffix}`;
  };

  const fetchFlights = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Admin not logged in. Please login as admin.");
        return;
      }

      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/flights`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlights(res.data);
    } catch (err) {
      console.error("Fetch Error:", err.message);
      if (err.response && err.response.status === 403) {
        alert("Access forbidden. You may not have the required permissions.");
      }
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleClose = () => {
    setShow(false);
    setFormData({
      airline: "",
      from: "",
      to: "",
      departureDate: "",
      departureTime: "00:00",
      arrivalTime: "00:00",
      price: "",
    });
    setEditId(null);
  };

  const handleShow = (flight = null) => {
    if (flight) {
      setFormData({
        airline: flight.airline || "",
        from: flight.from || "",
        to: flight.to || "",
        departureDate: flight.departureDate?.slice(0, 10) || "",
        departureTime: flight.departureTime || "00:00",
        arrivalTime: flight.arrivalTime || "00:00",
        price: flight.price || "",
      });
      setEditId(flight._id);
    }
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Admin not logged in.");
        return;
      }

      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (editId) {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/admin/flights/${editId}`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/admin/flights`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchFlights();
      handleClose();
    } catch (err) {
      console.error("Submit Error:", err.message);
      alert("Failed to save flight. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Admin not logged in.");
        return;
      }

      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/admin/flights/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFlights();
    } catch (err) {
      console.error("Delete Error:", err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">✈️ Manage Flights</h2>
      <Button variant="primary" className="mb-3" onClick={() => handleShow()}>
        + Add Flight
      </Button>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Airline</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight._id}>
              <td>{flight.airline}</td>
              <td>{flight.from}</td>
              <td>{flight.to}</td>
              <td>{formatTimeAMPM(flight.departureTime)}</td>
              <td>{formatTimeAMPM(flight.arrivalTime)}</td>
              <td>
                {new Date(flight.departureDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td>₹{flight.price}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleShow(flight)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(flight._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Flight" : "Add Flight"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="airline">
                  <Form.Label>Airline</Form.Label>
                  <Form.Control
                    type="text"
                    name="airline"
                    value={formData.airline || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="price">
                  <Form.Label>Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="from">
                  <Form.Label>Source</Form.Label>
                  <Form.Control
                    type="text"
                    name="from"
                    value={formData.from || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="to">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    name="to"
                    value={formData.to || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="departureDate">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="departureDate"
                    value={formData.departureDate || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="departureTime">
                  <Form.Label>Departure Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="departureTime"
                    value={formData.departureTime || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="arrivalTime">
                  <Form.Label>Arrival Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="arrivalTime"
                    value={formData.arrivalTime || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editId ? "Update" : "Add"} Flight
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageFlights;
