'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PackageCard from '../../components/PackageCard';
import PackageForm from '../../components/PackageForm';
import AdminLayout from '../../components/AdminLayout.';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/package/getpackages');
      setPackages(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch packages');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (pkgData) => {
    try {
      await axios.post('http://localhost:5000/api/package/savepackages', pkgData);
      fetchPackages();
      setIsFormOpen(false);
    } catch (err) {
      setError('Failed to create package');
    }
  };

  const handleUpdate = async (id, pkgData) => {
    try {
      await axios.put(`http://localhost:5000/api/package/updatepackages/${id}`, pkgData);
      fetchPackages();
      setCurrentPackage(null);
      setIsFormOpen(false);
    } catch (err) {
      setError('Failed to update package');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/package/deletepackages/${id}`);
      fetchPackages();
    } catch (err) {
      setError('Failed to delete package');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Subscription Packages</h1>
          <button
            onClick={() => {
              setCurrentPackage(null);
              setIsFormOpen(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Package
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {isFormOpen && (
          <PackageForm
            pkg={currentPackage}
            onSave={currentPackage ? (data) => handleUpdate(currentPackage._id, data) : handleCreate}
            onCancel={() => {
              setIsFormOpen(false);
              setCurrentPackage(null);
            }}
          />
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : packages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No packages found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new subscription package.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Package
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg._id}
                pkg={pkg}
                onEdit={() => {
                  setCurrentPackage(pkg);
                  setIsFormOpen(true);
                }}
                onDelete={() => handleDelete(pkg.packageId)}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}