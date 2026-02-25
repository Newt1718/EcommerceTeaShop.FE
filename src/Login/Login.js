import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full font-display">

      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background-light lg:w-1/2 relative">
        
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Shop
        </Link>

        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight text-[#0d1b10]">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold leading-6 text-[#0d1b10] mb-2" htmlFor="email">Email address</label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-symbols-outlined text-gray-400 text-[20px]">mail</span>
                </div>
                <input 
                  id="email" 
                  type="email" 
                  required 
                  className="block w-full rounded-xl border border-gray-200 py-3 pl-10 text-[#0d1b10] bg-white focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm sm:leading-6 transition-all" 
                  placeholder="you@example.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold leading-6 text-[#0d1b10] mb-2" htmlFor="password">Password</label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-symbols-outlined text-gray-400 text-[20px]">lock</span>
                </div>
                <input 
                  id="password" 
                  type="password" 
                  required 
                  className="block w-full rounded-xl border border-gray-200 py-3 pl-10 pr-10 text-[#0d1b10] bg-white focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm sm:leading-6 transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 font-medium">Remember me</label>
              </div>
              <div className="text-sm leading-6">
                <span className="font-bold text-primary hover:underline cursor-pointer">Forgot password?</span>
              </div>
            </div>

            <button type="submit" className="flex w-full justify-center rounded-xl bg-primary px-3 py-3 text-sm font-bold leading-6 text-[#0d1b10] shadow-md hover:bg-primary/90 transition-transform hover:scale-[1.02]">
              Log In
            </button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-background-light px-6 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#0d1b10] shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                G
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#0d1b10] shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                App
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500 font-medium">
            Don't have an account? <Link to="/register" className="font-bold text-primary hover:underline">Sign up for free</Link>
          </p>
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block bg-[#ecf6ee]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 z-20 p-12 text-white">
          <blockquote className="space-y-2">
            <p className="text-xl font-medium italic">"A cup of tea is a cup of peace."</p>
            <footer className="text-sm text-gray-200">— Soshitsu Sen XV</footer>
          </blockquote>
        </div>
        <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1594631252845-29fc4cc8cbf9?q=80&w=1000" alt="Fresh green tea leaves" />
      </div>
    </div>
  );
};

export default Login;