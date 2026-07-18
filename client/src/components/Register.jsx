import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contextApi/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth(); // Get register from auth context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user types
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    // Check all fields are filled
    if (!formData.username || !formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Check password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  // Option 1: Using AuthContext register function
  const handleSubmitWithAuth = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare data for API (remove confirmPassword)
      const userData = {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      console.log('📤 Sending registration data via AuthContext:', { ...userData, password: '********' });

      // Use the register function from AuthContext
      const result = await register(userData);
      
      if (result) {
        setSuccess('Registration successful! Redirecting to dashboard...');
        setFormData({
          username: '',
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        // Redirect to admin dashboard after 2 seconds
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Option 2: Using direct axios (if AuthContext register doesn't work)
  const handleSubmitWithAxios = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare data for API (remove confirmPassword)
      const userData = {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      console.log('📤 Sending registration data via Axios:', { ...userData, password: '********' });

      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('📥 Registration response:', response.data);

      if (response.data.success) {
        setSuccess('Registration successful! Redirecting to login...');
        
        // Clear form
        setFormData({
          username: '',
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        
        const message = error.response.data?.message || 'Registration failed';
        
        if (error.response.status === 409) {
          setError('User already exists. Please use a different email or username.');
        } else if (error.response.status === 400) {
          setError(message);
        } else {
          setError(message);
        }
      } else if (error.request) {
        console.error('No response received');
        setError('Cannot connect to server. Please check if backend is running.');
      } else {
        console.error('Request error:', error.message);
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Choose which handleSubmit to use
  const handleSubmit = handleSubmitWithAuth; // Change to handleSubmitWithAuth if you want to use AuthContext

  return (
    <>
      <section className="login_register section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-sm-12 col-xs-12">
              <div className="register">
                <h4 className="login_register_title">Create a new account:</h4>
                
                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                {/* Success Message */}
                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control requiredField input-label"
                      placeholder="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control requiredField input-label"
                      placeholder="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control requiredField input-label"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control requiredField input-label"
                      placeholder="Password (min. 6 characters)"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control requiredField input-label"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group col-md-12 mbnone">
                    <button
                      className="btn btn-contact-bg"
                      type="submit"
                      name="submit"
                      disabled={loading}
                      style={{ width: '100%' }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating Account...
                        </>
                      ) : (
                        'Sign Up Now'
                      )}
                    </button>
                  </div>

                  <div className="mt-3 text-center">
                    <p className="text-muted">
                      Already have an account?{' '}
                      <Link to="/login" className="text-primary">
                        Login here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;