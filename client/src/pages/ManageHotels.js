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
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/hotels`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setHotels(res.data);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', location: '', price: '', rating: '', amenities: '' });
    setCurrentHotel(null);
  };

  const handleShowModal = (hotel = null) => {
    if (hotel) {
      setFormData(hotel);
      setCurrentHotel(hotel._id);
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('Admin not logged in.');
        return;
      }

      const { name, location, price, rating, amenities } = formData;

      if (currentHotel) {
        await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/api/admin/hotels/${currentHotel}`,
          { name, location, price, rating, amenities },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/admin/hotels`,
          { name, location, price, rating, amenities },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      fetchHotels();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving hotel:', error);
      alert('An error occurred while saving the hotel.');
    }
  };

  const handleDelete = async (hotelId) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('Admin not logged in.');
        return;
      }

      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/admin/hotels/${hotelId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchHotels();
    } catch (error) {
      console.error('Error deleting hotel:', error);
      alert('An error occurred while deleting the hotel.');
    }
  };

  return (
    <div>
      <Button onClick={() => handleShowModal()} className="mb-3">
        Add Hotel
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Amenities</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map(hotel => (
            <tr key={hotel._id}>
              <td>{hotel.name}</td>
              <td>{hotel.location}</td>
              <td>{hotel.price}</td>
              <td>{hotel.rating}</td>
              <td>{hotel.amenities}</td>
              <td>
                <Button onClick={() => handleShowModal(hotel)}>Edit</Button>
                <Button onClick={() => handleDelete(hotel._id)} variant="danger" className="ms-2">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentHotel ? 'Edit Hotel' : 'Add Hotel'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="text"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="amenities">
              <Form.Label>Amenities</Form.Label>
              <Form.Control
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {currentHotel ? 'Update' : 'Add'} Hotel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageHotels;
