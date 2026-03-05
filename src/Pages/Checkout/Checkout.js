import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth || { isAuthenticated: false, user: null });
  const [showAddressModal, setShowAddressModal] = useState(false);

  const savedAddresses = [
    {
      id: 1,
      label: "Campus Delivery",
      details: "FPT University Campus, Hoa Lac Hi-Tech Park, Thach That, Hanoi, Vietnam",
      isDefault: true,
    },
    {
      id: 2,
      label: "Home",
      details: "123 Tea Garden Lane, District 1, Ho Chi Minh City, Vietnam",
      isDefault: false,
    },
    {
      id: 3,
      label: "Work",
      details: "Keangnam Landmark 72, Pham Hung, Nam Tu Liem, Hanoi, Vietnam",
      isDefault: false,
    }
  ];

  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);

  const orderItems = [
    {
      id: 1,
      name: "Sencha Green Tea",
      details: "50g / Loose Leaf",
      price: "$14.00",
      qty: 1,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHwSQh3yVGOtNgVFt5Mzh6Rjx1m18YPEUj99Rwtq6qdvsibhIpHN2f46dQ3PCzFchCKOVy59m3VsSvmrV5R3VfRDtKy3rLPM4vVBcgkSjYJmQLkaGqWXOEbZo-Up7-DNQfGksPLzdAeJ193dCjLSQ9eJgLAq8hthiEd1oA2tL4jMI9KSHGs3alNDJfTmd4DOr5ioX2beU4iSH-pert2a2fsoN0uf5gWGYkxvl6rjvtufxMkRZkQT6-lonJ0vwrLIQIkV0ttv-QDifh",
    },
    {
      id: 2,
      name: "Earl Grey Reserve",
      details: "100g / Tin",
      price: "$24.00",
      qty: 2,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz3JiwkG7V7_d3dtVWmb9w9PMmC06M3B_jH3O_gf3rksdhRazyJshSr9R2Geid0lD4xp0zN-2Drx9E6Kbgbu1RKAp5U18ryxSzuHxND7g89JQGrAhKPZGdLYnQ5rVZc68QzAWr-V4aobYyM_qen8yCibKwx1twEGL-mTkMuSUyzcB0o_LuehhBeSaWSDUo2zXoCT8x2Esnq0JA0ab7ElTKFxzboncbCKU5Gk8zsxXoSjHUH3h-s3N66mmfDn3pbyYEiSFFMgWdJsms",
    },
  ];

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 font-display bg-background-light text-[#0d1b10] min-h-screen relative">
      
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-[#0d1b10]">Select Address</h3>
              <button onClick={() => setShowAddressModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {savedAddresses.map((addr) => (
                <div 
                  key={addr.id} 
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowAddressModal(false);
                  }}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedAddress.id === addr.id ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white hover:border-primary/30'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedAddress.id === addr.id ? 'border-primary' : 'border-gray-300'}`}>
                      {selectedAddress.id === addr.id && <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[#0d1b10]">{addr.label}</span>
                        {addr.isDefault && <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md">Default</span>}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{addr.details}</p>
                      <p className="text-sm font-medium text-[#0d1b10] mt-2">{user?.name || "Customer"} • +84 987 654 321</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={() => setShowAddressModal(false)} className="w-full mt-6 py-4 rounded-xl bg-surface-light text-[#0d1b10] font-bold hover:bg-gray-200 transition-colors">
              Add New Address
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
        <div className="flex-1 flex flex-col gap-8 order-2 lg:order-1">
          <nav className="flex items-center flex-wrap gap-2 text-sm font-medium">
            <Link to="/cart" className="text-primary hover:underline">
              Cart
            </Link>
            <span className="material-symbols-outlined text-gray-400 text-base">
              chevron_right
            </span>
            <span className="text-[#0d1b10]">Information</span>
            <span className="material-symbols-outlined text-gray-400 text-base">
              chevron_right
            </span>
            <span className="text-gray-500">Shipping</span>
            <span className="material-symbols-outlined text-gray-400 text-base">
              chevron_right
            </span>
            <span className="text-gray-500">Payment</span>
          </nav>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold tracking-tight text-[#0d1b10]">
                Contact Information
              </h3>
              {!isAuthenticated && (
                <div className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Log in
                  </Link>
                </div>
              )}
            </div>
            
            {isAuthenticated ? (
              <div className="p-4 rounded-xl border border-[#e7f3e9] bg-white flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black uppercase shrink-0">
                  {user?.name?.charAt(0) || "C"}
                </div>
                <div>
                  <p className="font-bold text-[#0d1b10]">{user?.name || "Customer"}</p>
                  <p className="text-sm text-gray-500">{user?.email || "customer@teavault.com"}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700 mb-1 block">
                    Email address
                  </span>
                  <input
                    className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10] placeholder:text-gray-400"
                    placeholder="you@example.com"
                    type="email"
                  />
                </label>
              </div>
            )}
            
            <div className="flex items-center gap-2 mt-4">
              <input
                className="rounded border-gray-300 text-primary focus:ring-primary bg-white"
                id="newsletter"
                type="checkbox"
              />
              <label className="text-sm text-gray-600" htmlFor="newsletter">
                Email me with news and offers
              </label>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold tracking-tight text-[#0d1b10] mb-4">
              Shipping Address
            </h3>
            
            {isAuthenticated ? (
              <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 relative">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                    <span className="font-bold text-[#0d1b10] text-lg">Deliver To: {selectedAddress.label}</span>
                  </div>
                  <button 
                    onClick={() => setShowAddressModal(true)}
                    className="text-xs font-bold uppercase tracking-widest text-primary hover:text-[#0d1b10] transition-colors"
                  >
                    Change
                  </button>
                </div>
                <div className="ml-7">
                  <p className="font-bold text-[#0d1b10] mb-1">{user?.name || "Customer"} <span className="text-gray-400 font-normal mx-2">|</span> +84 987 654 321</p>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                    {selectedAddress.details}
                  </p>
                </div>
              </div>
            ) : (
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
            )}
          </section>

          <section>
            <h3 className="text-xl font-bold tracking-tight text-[#0d1b10] mb-4">
              Shipping Method
            </h3>
            <div className="rounded-lg border border-[#e7f3e9] bg-white overflow-hidden">
              <label className="relative flex items-center p-4 border-b border-[#e7f3e9] cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  defaultChecked
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  name="shipping"
                  type="radio"
                />
                <div className="ml-3 flex flex-1 flex-col">
                  <span className="block text-sm font-medium text-[#0d1b10]">
                    Standard Shipping
                  </span>
                  <span className="block text-xs text-gray-500">
                    5-8 business days
                  </span>
                </div>
                <span className="text-sm font-medium text-[#0d1b10]">Free</span>
              </label>
              <label className="relative flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  name="shipping"
                  type="radio"
                />
                <div className="ml-3 flex flex-1 flex-col">
                  <span className="block text-sm font-medium text-[#0d1b10]">
                    Express Shipping
                  </span>
                  <span className="block text-xs text-gray-500">
                    1-3 business days
                  </span>
                </div>
                <span className="text-sm font-medium text-[#0d1b10]">
                  $15.00
                </span>
              </label>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold tracking-tight text-[#0d1b10] mb-4">
              Payment
            </h3>
            <div className="rounded-lg border border-[#e7f3e9] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Credit Card
                  </span>
                  <div className="flex gap-2 text-gray-400">
                    <span className="material-symbols-outlined">
                      credit_card
                    </span>
                    <span className="material-symbols-outlined">
                      account_balance_wallet
                    </span>
                  </div>
                </div>
                <label className="block">
                  <input
                    className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]"
                    placeholder="Card number"
                    type="text"
                  />
                </label>
                <label className="block">
                  <input
                    className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]"
                    placeholder="Name on card"
                    type="text"
                  />
                </label>
                <div className="flex gap-4">
                  <label className="block flex-1">
                    <input
                      className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]"
                      placeholder="Expiration (MM / YY)"
                      type="text"
                    />
                  </label>
                  <label className="block flex-1 relative">
                    <input
                      className="w-full h-12 px-4 rounded-lg bg-white border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10]"
                      placeholder="CVC"
                      type="text"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                      lock
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-6 mt-4 border-t border-[#e7f3e9]">
            <Link
              to="/cart"
              className="flex items-center gap-1 text-primary hover:text-green-600 transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined text-base">
                arrow_back
              </span>
              Return to cart
            </Link>
          </div>
        </div>

        <div className="lg:w-[400px] xl:w-[440px] flex-none order-1 lg:order-2">
          <div className="sticky top-24">
            <div className="bg-white border border-[#e7f3e9] rounded-2xl p-6 lg:p-8 shadow-sm">
              <h2 className="text-xl font-bold tracking-tight text-[#0d1b10] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="relative w-16 h-16 rounded-lg bg-white border border-[#e7f3e9] overflow-hidden flex-none">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#0d1b10]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.details}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-[#0d1b10]">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mb-6 pt-6 border-t border-[#e7f3e9]">
                <input
                  className="flex-1 h-12 px-4 rounded-lg bg-[#f8fcf9] border border-[#e7f3e9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-[#0d1b10] placeholder:text-gray-400 text-sm"
                  placeholder="Discount code"
                  type="text"
                />
                <button className="h-12 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#0d1b10] font-bold text-sm transition-colors">
                  Apply
                </button>
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
                <span className="text-base font-black text-[#0d1b10]">
                  Total
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-gray-500">USD</span>
                  <span className="text-3xl font-black text-[#0d1b10]">
                    $41.04
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center ">
                <button className="w-full sm:w-auto px-20 py-4 bg-primary hover:bg-[#0fd630] text-[#0d1b10] font-black tracking-wide rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;