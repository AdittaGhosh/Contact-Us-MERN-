'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://cybercraft-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
      setError('');
    } catch (err) {
      console.error('Error sending message:', err.message);
      setError(err.message);
      setSuccess('');
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Check out CyberCraft Bangladesh!`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Check out CyberCraft Bangladesh&body=Visit this awesome site: ${url}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="gradient-bg">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">CyberCraft Bangladesh</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-8">We’d love to hear from you</p>

        {success && <p className="text-green-500 mb-4">{success}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8">
          <p className="text-gray-600 mb-2">Share this page:</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleShare('facebook')}
              className="text-blue-600 hover:underline"
            >
              Facebook
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="text-blue-600 hover:underline"
            >
              Twitter
            </button>
            <button
              onClick={() => handleShare('email')}
              className="text-blue-600 hover:underline"
            >
              Email
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="text-blue-600 hover:underline"
            >
              Copy Link
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Link href="/admin/login">
            <span className="block w-full bg-indigo-500 text-white font-semibold py-2 rounded-md hover:bg-indigo-600 transition duration-300 text-center">
              Go to Login
            </span>
          </Link>
          <Link href="/admin/signup">
            <span className="block w-full bg-indigo-500 text-white font-semibold py-2 rounded-md hover:bg-indigo-600 transition duration-300 text-center">
              Go to Signup
            </span>
          </Link>
          <Link href="/admin/dashboard">
            <span className="block w-full bg-indigo-500 text-white font-semibold py-2 rounded-md hover:bg-indigo-600 transition duration-300 text-center">
              Go to Dashboard
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}