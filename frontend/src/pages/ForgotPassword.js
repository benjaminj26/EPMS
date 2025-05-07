// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to send password reset link
    //   const response = await axios.post('http://localhost:9598/user/forgot-password', { email });
    const response=await axios.post("http://localhost:5001/api/auth/user/forgot-password", { email });

      setMessage('Password reset link has been sent to your email.');
    } catch (error) {
      setMessage('Error sending password reset link. Please try again.');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter your email address:</label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
