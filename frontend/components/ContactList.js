'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDownTrayIcon, EyeIcon, TrashIcon, ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', message: '' });
  const [isDeleting, setIsDeleting] = useState(false); // Add loading state
  const router = useRouter();

  const fetchContacts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      router.push('/admin/login');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          router.push('/admin/login');
          return;
        }
        throw new Error(`Failed to fetch contacts: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log('Raw fetched contacts:', data);
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        setError('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching contacts:', err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [router]);

  const handleAddContact = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      router.push('/admin/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newContact),
      });

      if (!res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          throw new Error(errorData.message || `Failed to add contact: ${res.status} ${res.statusText}`);
        } else {
          throw new Error(`Failed to add contact: ${res.status} ${res.statusText}`);
        }
      }

      setIsModalOpen(false);
      setNewContact({ name: '', email: '', message: '' });
      await fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = async () => {
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      router.push('/admin/login');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/contact/download/pdf', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`Failed to download PDF: ${res.status} ${res.statusText}`);
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contacts.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    try {
      await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      router.push('/admin/logout');
    } catch (err) {
      setError('Failed to logout: ' + err.message);
    }
  };

  const handleView = (contact) => {
    alert(`Viewing contact: ${contact.name}`);
  };

  const handleDelete = async (contact) => {
    if (isDeleting) return;
    // Add confirmation prompt
    if (!window.confirm(`Are you sure you want to delete the contact for ${contact.name}?`)) {
      return;
    }
  
    setIsDeleting(true);
    setError('');
  
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      router.push('/admin/login');
      setIsDeleting(false);
      return;
    }
  
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(contact._id);
    if (!isValidObjectId) {
      setError('Invalid contact ID');
      console.log('Invalid contact ID:', contact._id);
      setIsDeleting(false);
      return;
    }
  
    try {
      console.log('Sending DELETE request for contact ID:', contact._id);
      const res = await fetch(`http://localhost:5000/api/contact/${contact._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          router.push('/admin/login');
          setIsDeleting(false);
          return;
        }
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          console.log('DELETE request failed:', errorData);
          throw new Error(errorData.message || `Failed to delete contact: ${res.status} ${res.statusText}`);
        } else {
          throw new Error(`Failed to delete contact: ${res.status} ${res.statusText}`);
        }
      }
  
      console.log('Contact deleted, refreshing contacts list');
      await fetchContacts();
    } catch (err) {
      console.error('Error in handleDelete:', err.message);
      setError(err.message === 'contact.remove is not a function' ? 'Failed to delete contact: Server error' : err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRefresh = () => {
    setSearchTerm('');
    fetchContacts();
  };

  return (
    <div className="dashboard-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Contact Submissions</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search by name, email, or message"
            className="form-control w-64"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={handleRefresh} className="small-btn">
            <ArrowPathIcon className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          <button onClick={() => setIsModalOpen(true)} className="small-btn">
            <PlusIcon className="h-4 w-4" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Contact</h3>
            <form onSubmit={handleAddContact}>
              <div className="mb-4">
                <label className="form-label" htmlFor="new-name">Full Name</label>
                <input
                  type="text"
                  id="new-name"
                  className="form-control"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="new-email">Email</label>
                <input
                  type="email"
                  id="new-email"
                  className="form-control"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="new-message">Message</label>
                <textarea
                  id="new-message"
                  className="form-control"
                  value={newContact.message}
                  onChange={(e) => setNewContact({ ...newContact, message: e.target.value })}
                  required
                  rows="3"
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1">Save Contact</button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="table-header">
              <th className="p-3 text-left w-[5%]">No.</th>
              <th className="p-3 text-left w-[10%]">Name</th>
              <th className="p-3 text-left w-[15%]">Email</th>
              <th className="p-3 text-left w-[40%]">Message</th>
              <th className="p-3 text-left w-[8%]">Date</th>
              <th className="p-3 text-left w-[22%]">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact, index) => (
              <tr key={contact._id} className="table-row">
                <td className="p-3 text-gray-700">{index + 1}</td>
                <td className="p-3 text-gray-700">{contact.name}</td>
                <td className="p-3 text-gray-700">{contact.email}</td>
                <td className="p-3 text-gray-700">{contact.message}</td>
                <td className="p-3 text-gray-700">{new Date(contact.createdAt).toLocaleDateString()}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleDownload()} className="small-btn text-blue-600">
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <button onClick={() => handleView(contact)} className="small-btn text-green-600">
                    <EyeIcon className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDelete(contact)}
                    className="small-btn text-red-600"
                    disabled={isDeleting}
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}