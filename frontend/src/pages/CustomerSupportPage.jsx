import React, { useState } from 'react';

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = {
        status: 'success',
        message: 'Thank you for contacting us! We have received your request and will get back to you shortly.',
      };

      if (response.status === 'success') {
        setSubmitted(true);
        setResponseMessage(response.message);
      } else {
        setResponseMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting support request:', error);
      setResponseMessage('Network error. Please try again later.');
    }
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 600px;
          margin: 40px auto;
          padding: 0 15px;
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
          margin-bottom: 30px;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 15px;
          font-weight: 600;
          display: flex;
          flex-direction: column;
          font-size: 14px;
        }
        input, textarea {
          margin-top: 8px;
          padding: 10px;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #ccc;
          resize: vertical;
          font-family: inherit;
          transition: border-color 0.3s;
        }
        input:focus, textarea:focus {
          border-color: #2874f0;
          outline: none;
        }
        button {
          background-color: #2874f0;
          color: #fff;
          padding: 14px 20px;
          border: none;
          border-radius: 4px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #1a4ec8;
        }
        .message {
          text-align: center;
          margin-top: 20px;
          font-weight: 600;
          font-size: 16px;
        }
        .success {
          color: green;
        }
        .error {
          color: red;
        }
        /* Responsive for smaller screens */
        @media (max-width: 480px) {
          .container {
            padding: 0 10px;
          }
          input, textarea {
            font-size: 14px;
          }
          button {
            padding: 12px 15px;
            font-size: 14px;
          }
        }
      `}</style>

      <div className="container border p-5 shadow rounded bg-light ">
        <h2>Customer Support</h2>

        {submitted ? (
          <div className="message success">{responseMessage}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </label>

            <label>
              Subject:
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Brief subject"
              />
            </label>

            <label>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Write your message here"
              />
            </label>

            <button type="submit">Submit</button>
          </form>
        )}

        {responseMessage && !submitted && (
          <div className="message error">{responseMessage}</div>
        )}
      </div>
    </>
  );
};

export default CustomerSupport;
