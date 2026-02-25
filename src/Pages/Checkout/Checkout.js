import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const orderItems = [
    {
      id: 1,
      name: 'Sencha Green Tea',
      details: '50g / Loose Leaf',
      price: '$14.00',
      qty: 1,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHwSQh3yVGOtNgVFt5Mzh6Rjx1m18YPEUj99Rwtq6qdvsibhIpHN2f46dQ3PCzFchCKOVy59m3VsSvmrV5R3VfRDtKy3rLPM4vVBcgkSjYJmQLkaGqWXOEbZo-Up7-DNQfGksPLzdAeJ193dCjLSQ9eJgLAq8hthiEd1oA2tL4jMI9KSHGs3alNDJfTmd4DOr5ioX2beU4iSH-pert2a2fsoN0uf5gWGYkxvl6rjvtufxMkRZkQT6-lonJ0vwrLIQIkV0ttv-QDifh'
    },
    {
      id: 2,
      name: 'Earl Grey Reserve',
      details: '100g / Tin',
      price: '$24.00',
      qty: 2,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz3JiwkG7V7_d3dtVWmb9w9PMmC06M3B_jH3O_gf3rksdhRazyJshSr9R2Geid0lD4xp0zN-2Drx9E6Kbgbu1RKAp5U18ryxSzuHxND7g89JQGrAhKPZGdLYnQ5rVZc68QzAWr-V4aobYyM_qen8yCibKwx1twEGL-mTkMuSUyzcB0o_LuehhBeSaWSDUo2zXoCT8x2Esnq0JA0ab7ElTKFxzboncbCKU5Gk8zsxXoSjHUH3h-s3N66mmfDn3pbyYEiSFFMgWdJsms'
    }
  ];

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 font-display bg-background-light text-[#0d1b10] min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
        
        <div className="flex-1 flex flex-col gap-8 order-2 lg:order-1">
          
          <nav className="flex items-center flex-wrap gap-2 text-sm font-medium">
            <Link to="/cart" className="text-primary hover:underline">Cart</Link>
            <span className="material-symbols-outlined text-gray-400 text-base">chevron_right</span>
            <span className="text-[#0d1b10]">Information</span>
            <span className="material-symbols-outlined text-gray-400 text-base">chevron_right</span>
            <span className="text-gray-500">Shipping</span>
            <span className="material-symbols-outlined text-gray-400 text-base">chevron_right</span>
            <span className="text-gray-500">Payment</span>
          </nav>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold tracking-tight text-[#0d1b10]">Contact Information</h3>
              <div className="text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700 mb-1 block">Email address</span>
                <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10] placeholder:text-gray-400" placeholder="you@example.com" type="email" />
              </label>
              <div className="flex items-center gap-2">
                <input className="rounded border-gray-300 text-primary focus:ring-primary bg-white" id="newsletter" type="checkbox" />
                <label className="text-sm text-gray-600" htmlFor="newsletter">Email me with news and offers</label>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold tracking-tight text-[#0d1b10] mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700 mb-1 block">First name</span>
                <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]" type="text" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700 mb-1 block">Last name</span>
                <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]" type="text" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-gray-700 mb-1 block">Address</span>
                <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]" type="text" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-gray-700 mb-1 block">Apartment, suite, etc. (optional)</span>
                <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]" type="text" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700 mb-1 block">City</span>
                <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]" type="text" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700 mb-1 block">Postal code</span>
                <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]" type="text" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-gray-700 mb-1 block">Country/Region</span>
                <select className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10] appearance-none">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Japan</option>
                  <option>Vietnam</option>
                </select>
              </label>
              <label className="block md:col-span-2 relative">
                <span className="text-sm font-medium text-gray-700 mb-1 block">Phone (optional)</span>
                <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]" type="tel" />
                <span className="material-symbols-outlined absolute right-3 top-9 text-gray-400 text-lg pointer-events-none">help</span>
              </label>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold tracking-tight text-[#0d1b10] mb-4">Shipping Method</h3>
            <div className="rounded-lg border border-[#e7f3e9] bg-white overflow-hidden">
              <label className="relative flex items-center p-4 border-b border-[#e7f3e9] cursor-pointer hover:bg-gray-50 transition-colors">
                <input defaultChecked className="h-4 w-4 text-primary border-gray-300 focus:ring-primary" name="shipping" type="radio" />
                <div className="ml-3 flex flex-1 flex-col">
                  <span className="block text-sm font-medium text-[#0d1b10]">Standard Shipping</span>
                  <span className="block text-xs text-gray-500">5-8 business days</span>
                </div>
                <span className="text-sm font-medium text-[#0d1b10]">Free</span>
              </label>
              <label className="relative flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <input className="h-4 w-4 text-primary border-gray-300 focus:ring-primary" name="shipping" type="radio" />
                <div className="ml-3 flex flex-1 flex-col">
                  <span className="block text-sm font-medium text-[#0d1b10]">Express Shipping</span>
                  <span className="block text-xs text-gray-500">1-3 business days</span>
                </div>
                <span className="text-sm font-medium text-[#0d1b10]">$15.00</span>
              </label>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold tracking-tight text-[#0d1b10] mb-4">Payment</h3>
            <div className="rounded-lg border border-[#e7f3e9] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Credit Card</span>
                  <div className="flex gap-2 text-gray-400">
                    <span className="material-symbols-outlined">credit_card</span>
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                  </div>
                </div>
                <label className="block">
                  <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]" placeholder="Card number" type="text" />
                </label>
                <label className="block">
                  <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]" placeholder="Name on card" type="text" />
                </label>
                <div className="flex gap-4">
                  <label className="block flex-1">
                    <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]" placeholder="Expiration (MM / YY)" type="text" />
                  </label>
                  <label className="block flex-1 relative">
                    <input className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]" placeholder="CVC" type="text" />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">lock</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-6 mt-4 border-t border-[#e7f3e9]">
            <Link to="/cart" className="flex items-center gap-1 text-primary hover:text-green-600 transition-colors text-sm font-medium">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Return to cart
            </Link>
            <button className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-[#0fd630] text-[#0d1b10] font-black tracking-wide rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
              Pay Now
            </button>
          </div>

        </div>

        <div className="lg:w-[400px] xl:w-[440px] flex-none order-1 lg:order-2">
          <div className="sticky top-24">
            <div className="bg-white border border-[#e7f3e9] rounded-2xl p-6 lg:p-8 shadow-sm">
              <h2 className="text-xl font-bold tracking-tight text-[#0d1b10] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="relative w-16 h-16 rounded-lg bg-white border border-[#e7f3e9] overflow-hidden flex-none">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#0d1b10]">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.details}</p>
                    </div>
                    <div className="text-sm font-bold text-[#0d1b10]">{item.price}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mb-6 pt-6 border-t border-[#e7f3e9]">
                <input className="flex-1 h-12 px-4 rounded-lg bg-[#f8fcf9] border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10] placeholder:text-gray-400 text-sm" placeholder="Discount code" type="text" />
                <button className="h-12 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#0d1b10] font-bold text-sm transition-colors">Apply</button>
              </div>

              <div className="space-y-3 pt-6 border-t border-[#e7f3e9] text-sm">
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold text-[#0d1b10]">$38.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Shipping</span>
                  <span className="font-bold text-[#0d1b10]">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Estimated Taxes</span>
                  <span className="font-bold text-[#0d1b10]">$3.04</span>
                </div>
              </div>

              <div className="flex justify-between items-end pt-6 mt-6 border-t border-[#e7f3e9]">
                <span className="text-base font-black text-[#0d1b10]">Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-gray-500">USD</span>
                  <span className="text-3xl font-black text-[#0d1b10]">$41.04</span>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 bg-surface-light py-3 rounded-xl border border-[#e7f3e9]">
                <span className="material-symbols-outlined text-xl">lock</span>
                <span className="text-xs font-bold">Secure SSL Encrypted Transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;