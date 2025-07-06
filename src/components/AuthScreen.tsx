import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Mail, Lock, UserPlus, LogIn, AlertCircle, CheckCircle, User } from 'lucide-react';
import lottie from 'lottie-web';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

// Lottie Animation Component
const LottieAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/Animation - 1751785819680.json',
      });

      return () => {
        anim.destroy();
      };
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%' 
      }} 
    />
  );
};

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const { signIn, signUp, resendConfirmation } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Email not confirmed')) {
            toast.error('Please check your email and click the confirmation link before signing in.');
          } else if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password. Please check your credentials.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Welcome back!');
        }
      } else {
        const { data, error } = await signUp(email, password, username);
        if (error) {
          if (error.message.includes('email_address_invalid')) {
            toast.error('Please use a valid email address. Demo emails like "demo@demo.com" are not accepted.');
          } else if (error.message.includes('User already registered')) {
            toast.error('An account with this email already exists. Please sign in instead.');
            setIsLogin(true);
          } else {
            toast.error(error.message);
          }
        } else {
          // Check if user needs email confirmation
          if (data.user && !data.session) {
            setShowEmailConfirmation(true);
            toast.success('Account created! Please check your email for a confirmation link.');
          } else {
            toast.success('Account created successfully!');
          }
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const { error } = await resendConfirmation(email);
      if (error) {
        if (error.message.includes('over_email_send_rate_limit')) {
          toast.error('Please wait a moment before requesting another confirmation email.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Confirmation email sent! Please check your inbox.');
      }
    } catch (error) {
      toast.error('Failed to resend confirmation email');
    } finally {
      setLoading(false);
    }
  };

  if (showEmailConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700 text-center">
            <div className="bg-green-600 rounded-full p-3 w-16 h-16 mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
            <p className="text-slate-300 mb-6">
              We've sent a confirmation link to <strong>{email}</strong>. 
              Please click the link in your email to activate your account.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleResendConfirmation}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  'Resend Confirmation Email'
                )}
              </button>
              
              <button
                onClick={() => {
                  setShowEmailConfirmation(false);
                  setIsLogin(true);
                }}
                className="w-full text-slate-400 hover:text-slate-300 transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex min-h-screen">
        {/* Left Panel - Animation & Branding */}
        <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center items-center relative">
          {/* Top Center Branding */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 w-full">
            <div className="flex items-center justify-center">
              <img
                src="/crane.png"
                alt="Site Logo"
                className="w-14 h-14 mr-4 rounded-full shadow-lg bg-white object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">Laxmi Chit Fund</h1>
                <p className="text-lg text-slate-400">Analytics Dashboard</p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            {/* Lottie Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center items-center mb-8"
            >
              <div className="w-96 h-96">
                <LottieAnimation />
              </div>
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome to Your Trading Journey
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Experience professional-grade analytics and insights to elevate your trading performance.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-slate-400">
                  {isLogin ? 'Sign in to your account' : 'Start your trading journey'}
                </p>
              </div>

              {/* Email validation notice for signup */}
              {!isLogin && (
                <div className="mb-6 p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-amber-200">
                      <p className="font-medium mb-1">Account Requirements:</p>
                      <ul className="text-amber-300 space-y-1">
                        <li>• Choose a unique username for your profile</li>
                        <li>• Use a real email address that can receive emails</li>
                        <li>• You'll need to confirm your email before signing in</li>
                        <li>• Demo emails (like demo@demo.com) are not accepted</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username field for signup */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Choose a username"
                        required
                        minLength={3}
                        maxLength={20}
                        pattern="^[a-zA-Z0-9_]+$"
                        title="Username can only contain letters, numbers, and underscores"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder={isLogin ? "Enter your email" : "Enter a valid email address"}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your password"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {isLogin ? <LogIn className="w-5 h-5 mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;