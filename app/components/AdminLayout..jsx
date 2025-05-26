'use client';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiLogOut, FiSettings, FiUser, FiPieChart, FiBox, FiUsers } from 'react-icons/fi';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiPieChart className="w-5 h-5" /> },
    { name: 'Packages', path: '/admin/packages', icon: <FiBox className="w-5 h-5" /> },
    { name: 'Users', path: '/admin/users', icon: <FiUsers className="w-5 h-5" /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <FiPieChart className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out z-50">
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-white p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">AdminHub</h1>
        </div>
        
        {/* User Profile */}
        <div className="px-6 py-4 border-t border-indigo-700 flex items-center space-x-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {session?.user?.name?.charAt(0) || 'A'}
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-indigo-900"></div>
          </div>
          <div>
            <p className="font-medium">{session?.user?.name || 'Admin'}</p>
            <p className="text-xs text-indigo-200">{session?.user?.email}</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    pathname === item.path
                      ? 'bg-indigo-700 text-white shadow-inner'
                      : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-700">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center justify-center w-full px-4 py-2 text-sm text-indigo-200 hover:text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {navItems.find((item) => pathname.startsWith(item.path))?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                    {session?.user?.name?.charAt(0) || 'A'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}