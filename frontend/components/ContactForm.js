'use client';
import { useState } from 'react';
import Logo from './Logo';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setStatus(data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Error submitting form');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container">
        <div className="text-center mb-6">
          <Logo />
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">Contact Us</h2>
          <p className="text-gray-600 mt-2">We’d love to hear from you</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="message">Message</label>
            <textarea
              id="message"
              className="form-control"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows="5"
            />
          </div>
          <button type="submit" className="btn-primary mb-4">Send Message</button>
          <div className="text-center">
            {status && <p className="mb-4 text-gray-600">{status}</p>}
            <p className="text-gray-600 mb-3">Share this page:</p>
            <div className="flex justify-center gap-2">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link flex items-center gap-1"
                aria-label="Share on Facebook"
              >
                <i className="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link flex items-center gap-1"
                aria-label="Share on Twitter"
              >
                <i className="fab fa-twitter"></i>
                <span>Twitter</span>
              </a>
              <a
                href="mailto:?subject=Contact Us&body=Check out this page: http://localhost:3000"
                className="btn-link flex items-center gap-1"
                aria-label="Share via Email"
              >
                <i className="fas fa-envelope"></i>
                <span>Email</span>
              </a>
              <button
                onClick={() => navigator.clipboard.writeText('http://localhost:3000')}
                className="btn"
                aria-label="Copy Link to Clipboard"
              >
                Copy Link
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}