import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VenueRegistrationPage = () => {
  const [venueDetails, setVenueDetails] = useState({
    venueName: '',
    venueEmail: '',
    venuePhone: '',
    venueLocation: '',
    address: '',
    capacity: '',
    rent: '',
    images: [],
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenueDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setVenueDetails((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in venueDetails) {
      if (Array.isArray(venueDetails[key])) {
        venueDetails[key].forEach((file) => formData.append('images', file));
      } else {
        formData.append(key, venueDetails[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:9598/venue', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Venue registered successfully');
        setVenueDetails({
          venueName: '',
          venueEmail: '',
          venuePhone: '',
          venueLocation: '',
          address: '',
          capacity: '',
          rent: '',
          images: [],
        });
        navigate('/');
      } else {
        alert('Failed to register venue');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering the venue');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-sky-200 px-40 py-10">
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 sm:p-10">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Venue Registration</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="venueName" className="block text-sm font-medium text-gray-700">Venue Name</label>
                  <input
                    type="text"
                    id="venueName"
                    name="venueName"
                    value={venueDetails.venueName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="venueEmail" className="block text-sm font-medium text-gray-700">Venue Email</label>
                  <input
                    type="email"
                    id="venueEmail"
                    name="venueEmail"
                    value={venueDetails.venueEmail}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="venuePhone" className="block text-sm font-medium text-gray-700">Venue Phone</label>
                  <input
                    type="tel"
                    id="venuePhone"
                    name="venuePhone"
                    value={venueDetails.venuePhone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="venueLocation" className="block text-sm font-medium text-gray-700">Venue Location</label>
                  <input
                    type="text"
                    id="venueLocation"
                    name="venueLocation"
                    value={venueDetails.venueLocation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={venueDetails.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={venueDetails.capacity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="rent" className="block text-sm font-medium text-gray-700">Rent</label>
                  <input
                    type="number"
                    id="rent"
                    name="rent"
                    value={venueDetails.rent}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700">Upload Images</label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    onChange={handleImageChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    accept="image/*"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VenueRegistrationPage;
