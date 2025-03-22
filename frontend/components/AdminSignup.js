'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function AdminSignup() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('https://cybercraft-backend.onrender.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.status === 201) router.push('/admin/login');
    } catch (error) {
      setMessage('Signup failed');
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = 'https://cybercraft-backend.onrender.com/auth/google';
  };

  const handleFacebookSignup = () => {
    window.location.href = 'https://cybercraft-backend.onrender.com/auth/facebook';
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container">
        <div className="text-center mb-6">
          <Logo />
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">Admin Signup</h2>
          <p className="text-gray-600 mt-2">Create your CyberCraft Bangladesh account</p>
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
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="email">Email Address</label>
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
            <label className="form-label" htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary mb-4">Create Account</button>
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Already have an account?{' '}
              <a href="/admin/login" className="text-blue-600 hover:underline">
                Log in
              </a>
            </p>
            <p className="text-gray-600 mb-3">or sign up with:</p>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={handleFacebookSignup}
                className="btn-link flex items-center gap-1"
                aria-label="Sign up with Facebook"
              >
                <i className="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </button>
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="btn-link flex items-center gap-1"
                aria-label="Sign up with Google"
              >
                <i className="fab fa-google"></i>
                <span>Google</span>
              </button>
            </div>
          </div>
          {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}