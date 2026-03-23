import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight, Library, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { authApi } from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.login(email, password);
      localStorage.setItem('token', response.data.token);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data || "Échec de la connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <div className="bg-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Library size={32} className="text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Content de vous revoir</h1>
            <p className="text-gray-400">Accédez à votre espace bibliothèque</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-center gap-3"
              >
                <ShieldCheck size={18} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="nom@exemple.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-gray-400">Mot de passe</label>
                <button type="button" className="text-xs text-blue-400 hover:underline">Oublié ?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          <div className="text-center pt-4 border-t border-gray-700/50">
            <p className="text-gray-400 text-sm">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">Créer un compte</Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials Box */}
        <div className="mt-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 flex items-start gap-3">
          <ShieldCheck className="text-blue-400 shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-bold text-blue-400">Compte de test :</p>
            <p className="text-xs text-gray-400 mt-1">
              Email : <span className="text-gray-200 font-mono">admin@bibliotheque.com</span><br/>
              Pass : <span className="text-gray-200 font-mono">admin123</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
