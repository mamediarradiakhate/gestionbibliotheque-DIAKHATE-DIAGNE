import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight, Library, ShieldCheck, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 bg-[#0f172a]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-gray-900/50 backdrop-blur-2xl rounded-[2.5rem] border border-gray-700/50 shadow-2xl overflow-hidden relative z-10"
      >
        {/* Left Side: Image & Content */}
        <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 p-12 text-white">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
              alt="Library" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Library size={32} className="text-white" />
              </div>
              <span>BiblioTech</span>
            </div>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-5xl font-extrabold leading-tight">
                  La connaissance à portée de clic.
                </h2>
                <p className="text-blue-100/80 text-lg mt-4 leading-relaxed">
                  Gérez votre collection, découvrez de nouveaux horizons et organisez votre savoir avec notre interface intelligente.
                </p>
              </motion.div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img 
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-indigo-600 object-cover"
                      src={`https://i.pravatar.cc/150?u=${i+10}`}
                      alt="User"
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-blue-100">Rejoint par +2,000 lecteurs</p>
              </div>
            </div>

            <div className="text-sm text-blue-200/50 flex items-center gap-2">
              <Sparkles size={16} />
              <span>Propulsé par une IA intelligente</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="lg:hidden bg-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Library size={32} className="text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Content de vous revoir</h1>
            <p className="text-gray-400">Accédez à votre espace bibliothèque personnalisé</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm flex items-center gap-3"
              >
                <ShieldCheck size={18} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 ml-1">Email professionnel</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                  placeholder="nom@exemple.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-gray-400">Mot de passe</label>
                <button type="button" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Oublié ?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2 group mt-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-lg">Accéder au catalogue</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          <div className="text-center pt-4 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              Nouveau sur la plateforme ?{' '}
              <Link to="/register" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">Créer un compte gratuit</Link>
            </p>
          </div>

          {/* Test Account Helper */}
          <div className="bg-blue-500/5 border border-blue-500/10 rounded-[1.5rem] p-5 flex items-start gap-4">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <ShieldCheck className="text-blue-400 shrink-0" size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-blue-400">Identifiants de démonstration</p>
              <div className="flex flex-col sm:flex-row sm:gap-4 text-xs">
                <span className="text-gray-500">Email: <span className="text-gray-300 font-mono">admin@bibliotheque.com</span></span>
                <span className="text-gray-500">Pass: <span className="text-gray-300 font-mono">admin123</span></span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
