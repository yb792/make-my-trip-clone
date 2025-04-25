import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    rating: '',
    amenities: ''
  });
  const [currentHotel, setCurrentHotel] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const token = localStorage.getItem('adminToken');
    const res = await axios.get('/api/admin/hotels', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setHotels(res.data);
  };

  const handleShow = (hotel = null) => {
    setCurrentHotel(hotel);
    setFormData(
      hotel
        ? {
            name: hotel.name || '',
            location: hotel.location || '',
            price: hotel.price?.toString() || '',
            rating: hotel.rating?.toString() || '',
            amenities: Array.isArray(hotel.amenities)
              ? hotel.amenities.join(', ')
              : ''
          }
        : {
            name: '',
            location: '',
            price: '',
            rating: '',
            amenities: ''
          }
    );
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentHotel(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const data = {
        ...formData,
        price: parseInt(formData.price),
        rating: parseFloat(formData.rating),
        amenities: formData.amenities
          .split(',')
          .map((a) => a.trim())
          .filter(Boolean)
      };

      if (currentHotel) {
        await axios.put(`/api/admin/hotels/${currentHotel._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/admin/hotels', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setShowModal(false);
      fetchHotels(); // refresh updated list
    } catch (error) {
      console.error('Error saving hotel:', error);
    }
  };

  const handleDelete = async (hotelId) => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`/api/admin/hotels/${hotelId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Hotels</h2>
      <Button variant="primary" onClick={() => handleShow()}>
        Add New Hotel
      </Button>
      <ul className="list-group mt-4">
        {hotels.map((hotel) => (
          <li
            key={hotel._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {hotel.name} - ₹{hotel.price}
            </span>
            <div>
              <Button
                variant="warning"
                className="me-2"
                onClick={() => handleShow(hotel)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(hotel._id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for adding/editing hotels */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentHotel ? 'Edit Hotel' : 'Add Hotel'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formHotelName">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formHotelLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formHotelPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formHotelRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="5"
                required
              />
            </Form.Group>

            <Form.Group controlId="formHotelAmenities">
              <Form.Label>Amenities (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              {currentHotel ? 'Update Hotel' : 'Add Hotel'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageHotels;
