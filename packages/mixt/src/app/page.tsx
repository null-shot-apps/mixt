'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsLoading(true);
    // Simulate sign-up process
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  };

  const handleAppleSignUp = () => {
    setIsLoading(true);
    // Simulate Apple sign-up
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Icon */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-6 animate-bounce">🍳</div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
            Mixt
          </h1>
          <p className="text-xl text-gray-600">
            Discover African cuisines and global recipes
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Get Started</h2>
            <p className="text-gray-600">Sign up to start cooking</p>
          </div>

          {/* Apple Sign Up */}
          <button
            onClick={handleAppleSignUp}
            disabled={isLoading}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-800 hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            {isLoading ? 'Signing up...' : 'Continue with Apple'}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">or</span>
            </div>
          </div>

          {/* Email Sign Up */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none bg-gray-50 hover:bg-white transition-all"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all duration-200"
            >
              {isLoading ? 'Signing up...' : 'Continue with Email'}
            </button>
          </form>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">⚡ Fast • Accurate • African-First</p>
        </div>
      </div>
    </div>
  );
}

