'use client';
import Logo from '../../../components/Logo';
import { BellIcon, CogIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-6">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">9</span>
          <CogIcon className="h-6 w-6 text-gray-600" />
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
              AS
            </div>
            <div>
              <p className="text-gray-800 font-medium text-sm">Arya Stark</p>
              <p className="text-gray-500 text-xs">Admin</p>
            </div>
          </div>
        </div>
      </header>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="dashboard-container text-center">
          <Logo />
          <p className="text-gray-600 mt-4 mb-6">
            Thank you so much for your nice contribution for today.
          </p>
          <button
            onClick={handleGoBack}
            className="btn-primary px-4"
          >
            Go Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}