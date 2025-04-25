import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Admin Dashboard</h2>
      <div className="d-flex justify-content-center">
        <div className="card shadow-sm border-0 w-75">
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Manage Your Services</h4>
            <div className="d-flex justify-content-around">
              <Link 
                to="/admin/flights" 
                className="btn btn-primary btn-lg px-4 py-3 w-45">
                Manage Flights
              </Link>
              <Link 
                to="/admin/hotels" 
                className="btn btn-success btn-lg px-4 py-3 w-45">
                Manage Hotels
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
