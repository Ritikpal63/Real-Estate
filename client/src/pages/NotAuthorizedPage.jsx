import { Link } from "react-router-dom";

const NotAuthorizedPage = () => (
  <div className="container py-5">
    <div className="card mx-auto" style={{ maxWidth: 600 }}>
      <div className="card-body text-center">
        <h2>Access denied</h2>
        <p>This page is only available for admin users.</p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  </div>
);

export default NotAuthorizedPage;