import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-white text-xl font-bold tracking-wide">
                CyberCraft Bangladesh
              </span>
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link href="/">
              <span className="text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Home
              </span>
            </Link>
            <Link href="/admin/login">
              <span className="text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Login
              </span>
            </Link>
            <Link href="/admin/signup">
              <span className="text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Signup
              </span>
            </Link>
            <Link href="/admin/dashboard">
              <span className="text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Dashboard
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}