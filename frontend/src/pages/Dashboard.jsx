import React, { useState, useEffect } from 'react';
import { Book as BookIcon, Loader2, Search, Plus } from 'lucide-react';
import { bookApi } from '../api';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await bookApi.getBooks();
      // Adjust according to backend response structure
      const data = Array.isArray(response.data) ? response.data : response.data.books || [];
      setBooks(data);
    } catch (err) {
      console.error("Fetch books error:", err);
      setError("Failed to load books. Please make sure the services are running.");
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(book => 
    book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Library Catalog</h1>
          <p className="text-gray-400">Explore and manage our collection</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search books..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md transition-colors flex items-center gap-2">
            <Plus size={20} />
            <span className="hidden sm:inline">Add Book</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p>Loading books...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-8 rounded-lg text-center">
          <p className="text-xl mb-4 font-semibold">{error}</p>
          <button 
            onClick={fetchBooks}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 border-dashed p-20 rounded-lg text-center text-gray-500">
          <BookIcon size={64} className="mx-auto mb-4 opacity-20" />
          <p className="text-xl">No books found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div 
              key={book.id || book._id} 
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/5 group"
            >
              <div className="h-48 bg-gray-900 flex items-center justify-center relative group-hover:bg-gray-900/80 transition-colors">
                <BookIcon size={48} className="text-gray-700 group-hover:text-blue-500/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold">View Details</button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-white mb-1 truncate">{book.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{book.author || "Unknown Author"}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${book.available !== false ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {book.available !== false ? 'Available' : 'Borrowed'}
                  </span>
                  <span className="text-gray-500 text-xs">ID: {book.id || book._id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
