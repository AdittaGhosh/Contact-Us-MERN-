'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContactList from '../../../components/ContactList';
import Logo from '../../../components/Logo';
import { BellIcon, CogIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const { token } = Object.fromEntries(new URLSearchParams(window.location.search));
    if (token) {
      localStorage.setItem('token', token);
      router.replace('/admin/dashboard');
    }
    if (!localStorage.getItem('token')) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <Logo />
      </header>
      <div className="max-w-6xl mx-auto p-6">
        <ContactList />
      </div>
    </div>
  );
}