import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full font-display">
      
      {/* Left Side: Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background-light lg:w-1/2 relative">
        
        {/* Back to Home Button */}
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Shop
        </Link>

        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black tracking-tight text-[#0d1b10] mb-3">Create Account</h1>
            <p className="text-sm text-gray-500 font-medium">
              Sign up to track orders, save favorites, and earn loyalty points.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm font-bold text-sm">
              Google
            </button>
            <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm font-bold text-sm">
              Facebook
            </button>
          </div>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">Or register with email</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold leading-6 text-[#0d1b10] mb-2">Full Name</label>
              <div className="relative rounded-md shadow-sm">
                <span className="material-symbols-outlined absolute left-0 top-0 flex h-full items-center pl-3 text-gray-400 !text-[20px] pointer-events-none">person</span>
                <input type="text" required className="block w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-[#0d1b10] bg-white focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all" placeholder="e.g. Jane Doe" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold leading-6 text-[#0d1b10] mb-2">Email Address</label>
              <div className="relative rounded-md shadow-sm">
                <span className="material-symbols-outlined absolute left-0 top-0 flex h-full items-center pl-3 text-gray-400 !text-[20px] pointer-events-none">mail</span>
                <input type="email" required className="block w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-[#0d1b10] bg-white focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all" placeholder="jane@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold leading-6 text-[#0d1b10] mb-2">Password</label>
              <div className="relative rounded-md shadow-sm">
                <span className="material-symbols-outlined absolute left-0 top-0 flex h-full items-center pl-3 text-gray-400 !text-[20px] pointer-events-none">lock</span>
                <input type="password" required className="block w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-[#0d1b10] bg-white focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary" />
              <label htmlFor="terms" className="text-sm text-gray-600 font-medium">
                I agree to the <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>.
              </label>
            </div>

            <button type="submit" className="w-full mt-2 h-12 flex items-center justify-center rounded-xl bg-primary hover:bg-primary/90 transition-transform hover:scale-[1.02] shadow-md text-[#0d1b10] text-base font-bold">
              Create Account
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-500 font-medium">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log In</Link>
          </p>
        </div>
      </div>

      {/* Right Side: Visual */}
      <div className="relative hidden w-0 flex-1 lg:block bg-[#ecf6ee]">
        <div className="absolute inset-0 bg-gradient-to-t from-background-light/40 to-transparent z-10"></div>
        <img src="https://images.unsplash.com/photo-1589144883460-619f70d1d643?q=80&w=1000" alt="Serene matcha tea setup" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <div className="backdrop-blur-md bg-white/90 p-8 rounded-2xl shadow-xl max-w-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-full text-primary">
                <span className="material-symbols-outlined !text-[32px]">spa</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0d1b10] mb-2">Premium Quality Tea</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  "Join over 20,000 tea enthusiasts who have discovered their perfect blend with us. Experience freshness like never before."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;