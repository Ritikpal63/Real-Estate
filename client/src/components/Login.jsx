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






// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      
//       if (response.data.success) {
//         // Store token in localStorage
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify(response.data.user));
        
//         // Redirect to admin dashboard
//         navigate('/admin');
//       } else {
//         setError(response.data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError(error.response?.data?.message || 'An error occurred during login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
//       <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-2xl">
//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             Admin Login
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Enter your credentials to access the admin panel
//           </p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
//             <p className="text-red-700 text-sm">{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               value={credentials.username}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               placeholder="Enter username"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               placeholder="Enter password"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                 </svg>
//                 Logging in...
//               </span>
//             ) : (
//               'Login'
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;