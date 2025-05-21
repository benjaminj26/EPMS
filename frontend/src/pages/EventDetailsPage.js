import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaUser as User, FaCalendarAlt as CalendarDays, FaMapPin as MapPin } from 'react-icons/fa';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9598/event`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          },
          params: { eventId }
        });
        setEvent(response.data);
      } catch (error) {
        setError('Error fetching event details');
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleGenerateGuestLink = () => {
    const formLink = "https://tally.so/r/wkpJ21";
    navigator.clipboard.writeText(formLink).then(() => {
      alert('Form link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleMakePayment = () => {
    if (event && event.id && event.budget) {
      navigate('/payment', { 
        state: { 
          eventId: event.id, 
          budget: event.budget 
        } 
      });
    } else {
      alert('Unable to process payment: Event details are incomplete.');
    }
  };

  const handleDownloadPDF = async () => {
    const content = document.getElementById('pdf-details-container');
    if (!content) {
      alert('Failed to generate PDF: Element not found');
      return;
    }

    content.style.display = 'block';

    setTimeout(() => {
      html2canvas(content, { scale: 2, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('event-details.pdf');

        content.style.display = 'none';
      }).catch((error) => {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF.');
        content.style.display = 'none';
      });
    }, 500);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>No event data found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="p-6 md:p-8 lg:p-10 flex-1 mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden ring-1 ring-gray-200">
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{event.name}</h2>
              <div className="space-y-4">
                <div><strong>Host:</strong> {event.host || 'N/A'}</div>
                <div><strong>Type:</strong> {event.type || 'N/A'}</div>
                <div><strong>Date:</strong> {formatDate(event.date)}</div>
                <div><strong>Venue:</strong> {event.venue || 'N/A'}</div>
                <div><strong>Address:</strong> {event.address || 'N/A'}</div>
                <div><strong>Location:</strong> {event.location || 'N/A'}</div>
                <div><strong>Status:</strong> {event.status}</div>
                <div><strong>Payment Status:</strong> {event.paymentStatus}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 flex justify-end gap-4">
              {event.paymentStatus !== 'PAID' ? (
                <button
                  onClick={handleMakePayment}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Make Payment
                </button>
              ) : (
                <>
                  <button
                    onClick={handleGenerateGuestLink}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transform hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Generate Guest Link
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transform hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Download PDF
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Hidden Container for PDF */}
          <div id="pdf-details-container" style={{ display: 'none', padding: '40px' }}>
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-300 p-8">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{event.name}</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>Host:</strong> {event.host || 'N/A'}</p>
                <p><strong>Type:</strong> {event.type || 'N/A'}</p>
                <p><strong>Date:</strong> {formatDate(event.date)}</p>
                <p><strong>Venue:</strong> {event.venue || 'N/A'}</p>
                <p><strong>Address:</strong> {event.address || 'N/A'}</p>
                <p><strong>Location:</strong> {event.location || 'N/A'}</p>
                <p><strong>Status:</strong> {event.status || 'N/A'}</p>
                <p><strong>Payment Status:</strong> {event.paymentStatus || 'N/A'}</p>
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                Thank you for choosing our platform. We look forward to making your event special!
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
