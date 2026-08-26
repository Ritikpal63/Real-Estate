import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contextApi/useAuth";

const Login = () => {
  const { login, authError, authLoading, user, setAuthError, isAuthenticated } =
  useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;

  useEffect(() => {
    if (user) {
      const destination = from || (user.role === "admin" ? "/admin" : "/");

      navigate(destination, {
        replace: true
      });
    }
  }, [user, from, navigate]);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
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

    await login(credentials);
  };

  return (
    <section className="login_register section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-sm-12 col-xs-12">
            <div className="login">
              <h4 className="login_register_title">Login</h4>
              {authError &&
              <div className="alert alert-danger" role="alert">
                  {authError}
                </div>
              }
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control requiredField input-label"
                    placeholder="Email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    disabled={authLoading} />

                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control requiredField input-label"
                    placeholder="Enter Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    disabled={authLoading} />

                </div>
                <div className="form-group col-md-12 mbnone">
                  <button
                    className="btn w-full btn-blog-bg"
                    type="submit"
                    disabled={authLoading}>

                    {authLoading ?
                    <>
                        <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true">
                      </span>
                        Signing in...
                      </> :

                    "Login"
                    }
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-muted">
                    If you don't have an account?{" "}
                    <Link to="/register" className="text-primary">
                      Register here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default Login;
