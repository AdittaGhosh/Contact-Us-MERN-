'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div className="bg-white p-6 border border-gray-300 rounded-md">
      <Logo />
      <p className="text-gray-600 mt-2 mb-6 text-sm">
        Welcome back to CyberCraft Bangladesh, where your creativity thrives
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">EMAIL ADDRESS</label>
          <input
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">PASSWORD</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-0"
            />
            <span className="text-gray-600 text-sm">Remember me</span>
          </label>
          <a href="#" className="text-blue-600 text-sm">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full btn-primary"
        >
          Log in
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600 mb-2">OR</p>
        <p className="text-gray-600">
          Don’t have an account?{' '}
          <a href="/admin/signup" className="text-blue-600">Sign up</a>
        </p>
      </div>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
}