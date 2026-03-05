import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess } from "../../../redux/authSlice/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading } = useSelector((state) => state.auth || { loading: false });

  const handleLogin = (e) => {
    e.preventDefault();
    
    dispatch(loginStart());

    setTimeout(() => {
      const mockUserData = {
        id: "USR-001",
        name: "Admin User",
        email: email,
        role: "admin",
      };

      dispatch(loginSuccess(mockUserData));
      navigate("/admin/dashboard");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen w-full font-display">
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background-light lg:w-1/2 relative">
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Shop
        </Link>

        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight text-[#0d1b10]">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                className="block text-sm font-bold leading-6 text-[#0d1b10] mb-2"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-symbols-outlined text-gray-400 text-[20px]">
                    mail
                  </span>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-xl border border-gray-200 py-3 pl-10 text-[#0d1b10] bg-white focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm sm:leading-6 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-bold leading-6 text-[#0d1b10] mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-symbols-outlined text-gray-400 text-[20px]">
                    lock
                  </span>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-xl border border-gray-200 py-3 pl-10 pr-10 text-[#0d1b10] bg-white focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm sm:leading-6 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm leading-6">
                <Link
                  to="/forgot-password"
                  className="font-bold text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-bold leading-6 text-[#0d1b10] shadow-md hover:bg-primary/90 transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-background-light px-6 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#0d1b10] shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5 h-5"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                Google
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-primary hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block bg-[#ecf6ee]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 z-20 p-12 text-white">
          <blockquote className="space-y-2">
            <p className="text-xl font-medium italic">
              "A cup of tea is a cup of peace."
            </p>
            <footer className="text-sm text-gray-200">— Soshitsu Sen XV</footer>
          </blockquote>
        </div>
        <img
          alt="Serene tea ceremony setup with green matcha tea, bamboo whisk, and ceramic cups on a wooden table"
          className="w-full h-full object-cover object-center opacity-90 dark:opacity-60"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqnZ-LwkyON-UQi0zYA2vT6-ffDxKpADQ9wj0QNT4GWnWVPZ-ukkAUWiXLF4ZdHrBH1uV8M6Z_GBMiEXBsE_9eG4Qu-M7NIqJqLu8BNDs8vJUfz53tZsKEayVUpvU-t-MRBGbS698yDMi1V6qGKIKPwW7YQtoxp7hwdrPSRhk1ZagPtyhaHF0zDAslviAgw-bj0DUVWixN4HFvd5zK856OqV4OCX5fu-gQSTS14kqz90KKYN-YwhwfLTFwWFFB5E60ijxhYM6wHXfx"
        />
      </div>
    </div>
  );
};

export default Login;