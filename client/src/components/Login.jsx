import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext";

const Login = () => {
  const { login, authError, authLoading, user, setAuthError } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (authError) {
      setAuthError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setAuthError("Please enter email and password");
      return;
    }

    const success = await login(credentials);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <section className="login_register section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-sm-12 col-xs-12">
            <div className="login">
              <h4 className="login_register_title">Admin login</h4>
              {authError && (
                <div className="alert alert-danger">{authError}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control requiredField input-label"
                    placeholder="Email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    disabled={authLoading}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control requiredField input-label"
                    placeholder="Enter Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    disabled={authLoading}
                  />
                </div>
                <div className="form-group col-md-12 mbnone">
                  <button
                    className="btn w-full btn-blog-bg"
                    type="submit"
					style={{backgroundColor:""}}
                    disabled={authLoading}
                  >
                    {authLoading ? "Signing in..." : "Login"}
                  </button>
                </div>
              </form>
              <p className="mt-3 text-muted">
                Use admin@realestate.local / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;