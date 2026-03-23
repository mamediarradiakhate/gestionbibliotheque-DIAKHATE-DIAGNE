import React, { useState, useEffect } from 'react';
import { Book as BookIcon, Loader2, Search, Plus, Filter, ArrowUpDown, MoreVertical, BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookApi } from '../api';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await bookApi.getBooks();
      const data = Array.isArray(response.data) ? response.data : response.data.books || [];
      setBooks(data);
    } catch (err) {
      setError("Impossible de charger les livres. Vérifiez que les services sont lancés.");
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books
    .filter(book => 
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'title') return a.title?.localeCompare(b.title);
      if (sortBy === 'author') return a.author?.localeCompare(b.author);
      return 0;
    });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Catalogue de la Bibliothèque
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <BookOpen size={16} />
            Explorez et gérez votre collection d'ouvrages
          </p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} />
          <span>Ajouter un livre</span>
        </motion.button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Livres', value: books.length, icon: BookIcon, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Disponibles', value: books.filter(b => b.available !== false).length, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Empruntés', value: books.filter(b => b.available === false).length, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-800/40 border border-gray-700/50 p-4 rounded-xl flex items-center gap-4">
            <div className={`${stat.bg} p-3 rounded-lg`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher par titre ou auteur..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
          >
            <option value="title">Trier par Titre</option>
            <option value="author">Trier par Auteur</option>
          </select>
          <button className="bg-gray-800 border border-gray-700 p-3 rounded-xl hover:bg-gray-700 transition-colors">
            <Filter size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="relative">
            <Loader2 className="animate-spin text-blue-500" size={64} />
            <BookIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400/50" size={24} />
          </div>
          <p className="text-gray-400 font-medium animate-pulse">Chargement de votre bibliothèque...</p>
        </div>
      ) : error ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/5 border border-red-500/20 text-red-400 p-12 rounded-3xl text-center space-y-6"
        >
          <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <BookIcon size={32} />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">{error}</p>
            <p className="text-red-400/80 max-w-md mx-auto">Assurez-vous que les services backend (ports 2600 et 2700) sont actifs.</p>
          </div>
          <button 
            onClick={fetchBooks}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20"
          >
            Réessayer la connexion
          </button>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredBooks.map((book) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={book.id || book._id} 
                className="group bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col"
              >
                <div className="h-44 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
                  {/* Decorative background pattern */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-500 rounded-tl-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-indigo-500 rounded-br-3xl"></div>
                  </div>
                  
                  <BookIcon size={56} className="text-gray-700 group-hover:text-blue-400 transition-all duration-500 group-hover:scale-110" />
                  
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-gray-900/80 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-4 flex-grow flex flex-col">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors line-clamp-1">{book.title}</h3>
                    <p className="text-gray-400 text-sm font-medium">{book.author || "Auteur inconnu"}</p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${book.available !== false ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                      <span className={`text-xs font-bold uppercase tracking-wider ${book.available !== false ? 'text-green-400' : 'text-amber-400'}`}>
                        {book.available !== false ? 'Disponible' : 'Emprunté'}
                      </span>
                    </div>
                    <span className="text-gray-600 text-xs font-mono">#{String(book.id || book._id).slice(-4)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!loading && !error && filteredBooks.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800/20 border-2 border-dashed border-gray-700/50 p-24 rounded-3xl text-center space-y-4"
        >
          <div className="bg-gray-800/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search size={40} className="text-gray-600" />
          </div>
          <p className="text-xl font-semibold text-gray-400">Aucun résultat trouvé</p>
          <p className="text-gray-500">Essayez de modifier vos termes de recherche ou vos filtres.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
