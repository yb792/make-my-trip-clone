import { Card, Button } from 'react-bootstrap';

export default function FlightCard({ flight }) {
  const { from, to, departure, airline, price } = flight;

  const formattedDate = new Date(departure).toLocaleString();

  return (
    <Card className="mb-3 shadow-sm border-primary">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <span>{from} → {to}</span>
          <span className="text-muted small">{airline}</span>
        </Card.Title>

        <Card.Text>
          <strong>Departure:</strong> {formattedDate} <br />
          <strong>Price:</strong> ₹{price}
        </Card.Text>

        <Button variant="outline-primary" disabled>
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
}
