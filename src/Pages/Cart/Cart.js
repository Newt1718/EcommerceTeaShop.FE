import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Golden Oolong Loose Leaf',
      size: '50g Tin',
      price: '$18.00',
      qty: 1,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZvc49uvIkt4MWN20sk5iUDaNsOUsouqNVNvPFxHWiCNeG554r2ELGFHwbIqqLyIUW9k1-LSdVun-QUWx1y2yis1m3YViLA_ctiFl8v_EE3XDR1vLh7fb2bL5OKBu-Mp46U8eabSTLPfM7iumDbFCyVXHPHo1P8bSwVEnFLDGEoS6tbGcJ7GIcadgWqNAhLGoqaaTk4Dz3SCWQoGo8cNaYwswRtyePeeRi_r2ppknKiUb4gAHSZje3mnAIQ6JoIaZ5HiDWhYrORobT'
    },
    {
      id: 2,
      name: 'Ceramic Tea Set - White',
      size: 'Minimalist Porcelain',
      price: '$45.00',
      qty: 1,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5uugs8cst1ahTr0TSIwO0GIJ4l-dskqYpvF2oXpgHu2XRjp6EdhLU7xBYOKogVIvr0jT8uEUdp_blEGzhppQ0aO5W1smPSNuTH6_fvPKwYhsmWWb5aHzrtzXCzWJUPiGsTXBHLZg4sTQU3FxK1zF_XHi-wzGJK--O30M4SczMeDjuvhdaK33CnouQBVA-PYbqds_l0iHncpgHgTR38zMoIaLyvjgVvhGSzM9BbbLAXYUw7czES6wPHZmM6P2XzkjdhCijuJb-Hbe3'
    },
    {
      id: 3,
      name: 'Jasmine Dragon Pearls',
      size: '100g Bag',
      price: '$22.00',
      qty: 2,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjjWaYszFeRx9d2ylydTvb3i0qhIWOfqorEz3uHaEVd-kD82ayqwQFOXKMrhUQFkh9gzpkLARTM_0soQ5YujmVVvP8lFcpfbyceOdusC2u-6ROakQtYLYT7veouGyDiBxEiWVcMwJ8GW7qX7vbuAYYhsmbxF9xLAaOvB1TY4sBVSvA0HEYIvktUd_V-WnZlugcJhaSrM3YMmTeLCik7_tUoFg3i6U6VqhWqYdvMgw8xOnYZjYU7KT9NjyCW4af6yaI5Okh3g39y0xJ'
    }
  ];

  const recommended = [
    {
      id: 1,
      name: 'Bamboo Matcha Whisk',
      price: '$15.00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSWe-WLJ5syzGBnZpLtMN2upQ1B3iLlGGIbEd9tDpdPehzchDOByBdlmIhfmFNUoaa2Hcy-DDru2aBqjd80-E8JvIKOik5ztOB0CpT_NCo9qOBo09-qKSnx43CaXVwfkQFMlHROj1mCFx84bY1pI6xQgdU5B5tJtmVt7eKhWTXW4zT0ywVKPhS9jKhWm8zXy_3kaPrU0Q7ImCElZPmhGOKNqQwb4vId3IoXYtMshRU8ZxsnVqqSIzoMN8N3Lp0LbF3HaNgokRCuIZB'
    },
    {
      id: 2,
      name: 'Glass Teapot 600ml',
      price: '$28.00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS_jnvCkkVS_Lxu9v6UK4WuwodKeilecOD8_O06yiCsfiDEqjaEHYnLI7KOdCm9lRuKLtulNHGuabQZ3DfwHqViY8yaxV4F2ivn7t03c9QxZBN5-C7e2Y39ozcfZOkVXfmPSDR_i2IDBtTta8kXEWskB1R3G4A6awi9IVERQS7Ygg7WpMJwvCu57GJFmGmGTY6_J6hgZbLSbqmUDjReneooRQRMlb5NcKCtDajVP-nG2pq4oYaE3_Myx01hh2Uw_7yf4ajEtL3ac-m'
    },
    {
      id: 3,
      name: 'Earl Grey Supreme',
      price: '$14.00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvApbvEHmH0om0esYwoTcsvkjq4mv4c7W5Cf2ZRGUJWXUToJMlrTjKX-R3a_hyzTB8hHT2uZT9SwvbOU5N-sL-QA97WPugUXbBCkfqn29uGhLHuNUhxSCH9emIKYCwSPoOlVq1WnFejPA0YM3JJtozyqk13IT2b4H8G85oBQQSYqjJ2Lk6tXN6_ITPUU6DpfY1jQuDZv10BzmOkJ4Ze-JnGfK9jLjvey3GwHgPCWEkQuGjp1fO5KszddrepOzVxUHoJ5BDhkAeNbeJ'
    },
    {
      id: 4,
      name: 'Raw Wildflower Honey',
      price: '$12.00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZAYHliFLqKkE-22HaTUzeWK_X9V31myhfQQnRw43CHvZn6mSbmHEFwNdIhBPEDUFQy-c620fyChCBhmNiXz3IhytXoIRnYanoRo2FifzXxEk1ap2Fo27siLqtlY9xMNYGYWP_4kipT2t50NrkCVJVy-FqXW5XtorM-2x9qrKPtFxPVo-xnk52hEgT7dWSm827RtTWQgp5YlgQl0B-X754sFDiFLkuGAOqVzba9sJJbN0Pjr0H764jDuAItlmMYFNMSmn0lD6Sah6k'
    }
  ];

  return (
    <div className="flex-1 flex justify-center py-8 px-4 md:px-10 lg:px-20 font-display bg-background-light text-[#102213] min-h-screen">
      <div className="flex flex-col max-w-[1200px] w-full">
        
        <div className="flex flex-wrap gap-2 pb-6 px-1">
          <Link to="/" className="text-gray-500 hover:text-primary text-sm font-medium transition-colors">Home</Link>
          <span className="text-gray-400 text-sm font-medium">/</span>
          <span className="text-[#102213] text-sm font-medium">Cart</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <div className="flex-1 w-full flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-[#e7f3e9] pb-4">
              <h1 className="text-[#0d1b10] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Your Cart (3 items)</h1>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-xl shadow-sm border border-transparent hover:border-[#e7f3e9] transition-all">
                <div className="shrink-0">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-full sm:w-28 h-28" style={{ backgroundImage: `url("${item.img}")` }}></div>
                </div>
                
                <div className="flex flex-1 flex-col justify-between h-full min-h-[112px]">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-[#0d1b10] text-lg font-bold leading-tight">{item.name}</h3>
                      <p className="text-gray-500 text-sm font-normal mt-1">{item.size}</p>
                    </div>
                    <p className="text-[#0d1b10] text-lg font-bold">{item.price}</p>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4 sm:mt-0">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-[#e7f3e9] bg-background-light h-9">
                        <button className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#0d1b10] transition-colors">-</button>
                        <input className="w-8 h-full text-center bg-transparent border-none text-sm font-medium focus:ring-0 p-0 text-[#0d1b10]" type="number" readOnly value={item.qty} />
                        <button className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#0d1b10] transition-colors">+</button>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-24">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e7f3e9]">
              <h3 className="font-bold text-xl mb-6 text-[#0d1b10]">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#0d1b10]">$107.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <span className="font-medium text-primary">Free</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium text-[#0d1b10]">$8.56</span>
                </div>
              </div>
              
              <div className="border-t border-[#e7f3e9] my-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#0d1b10]">Total</span>
                  <span className="text-2xl font-black text-[#0d1b10]">$115.56</span>
                </div>
              </div>

              <div className="mt-6 mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <input className="flex-1 bg-[#f8fcf9] border border-[#e7f3e9] rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none text-[#0d1b10]" placeholder="Enter code" type="text" />
                  <button className="px-4 py-2 bg-[#e7f3e9] text-[#0d1b10] text-sm font-semibold rounded-lg hover:bg-[#d5e6d8] transition-colors">Apply</button>
                </div>
              </div>
              
              <Link to="/checkout">
                <button className="w-full bg-primary text-[#102213] text-lg font-bold py-3.5 rounded-lg hover:bg-[#10d430] active:scale-[0.99] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  <span>Checkout</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </Link>
              
              <div className="mt-6 flex flex-col items-center gap-3 text-center">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                  Secure Checkout with SSL
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
                  Free shipping on orders over $50
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div className="mt-16 md:mt-24 pb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0d1b10]">You might also like</h3>
            <Link to="/shop" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              View All
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommended.map((item) => (
              <div key={item.id} className="group flex flex-col">
                <div className="relative overflow-hidden rounded-xl bg-[#e7f3e9] aspect-[4/5] mb-3">
                  <div className="bg-center bg-no-repeat bg-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url("${item.img}")` }}></div>
                  <Link to="/cart">
                    <button className="absolute bottom-3 right-3 h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#0d1b10] hover:bg-primary hover:text-[#102213] transition-colors translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </Link>
                </div>
                <h4 className="font-bold text-[#0d1b10] text-base">{item.name}</h4>
                <p className="text-gray-500 text-sm">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;