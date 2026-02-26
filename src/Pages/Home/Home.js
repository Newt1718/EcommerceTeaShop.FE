import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    { name: 'Green Tea', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNRoGoGQkdo5QM9Vve4ZOB1feIFhttSdYnDBa9PuEYtJOjiasM4eTnJYWaEb5RLoTpivN0JuFDNFb_N2rEzw-5Fu14CeggbygWEfzvK1nP1XpXexZiBpxPaU2J83GPuONIwUIDQ_rBvPw-QAqWmfd4-4I4tdqhOc1d0gfW6JlawhN9PAZECARqQ9wmwYDoY419n8ZHl0HaWNGlYu4saIZEy9RPltdbopNxyBaQdj9nW-YZ8voUXpr0O8Gb2usCmX8F_9Er3zNpL-1O' },
    { name: 'Black Tea', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkf-g9s9uMf9fvsyf8HLC1FW5vk1LfrynxGZYHFHGQeFRfrxCfOO92uJZloNcIwZlmUJ7OXJcaM-IP5mjnn55YKJP_sQae2GuG0rmVWpcF9vkvUweqHrJZBMYs8P0ToVRdA8luRfeFurQXm2Cl96nj_ugGkyPP-9lqZNf9qafDdAzmnbjZiDbR3Xc3dDQ6x3nNtP_mIdngqgEsUZ7mw2MnMGaYgde2tgOJNX78Gvj67RpBOOE-dZWFxx4g79sz8fDpftsI9_b-q89V' },
    { name: 'Herbal & Floral', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEGJSAQyNEBumm6px14DPffIVc_3Kfq_fPaSwwRMmHgslFXO6o1i-zlXYk8VkZLOVGBH0pNSskkK2yba2W97zxoOSl_pWGpcf8WHhhAbHjVekwBTUl-Ew0ikknPDmcS7K2BCqPXswPYcKNM3ZLSmutxPEzukUuSUERP7i73W5JXkCn8d-HkLE8T-UUWvaJTQobyYhB6kTi2UTqzkDh3VLsAUPuKB5t8lU--loCpz_wBqP92pxqmKFDhR2LABaZVMSNRsRb5r3hBcnl' },
    { name: 'Oolong', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGmX8G7ewmtAniJ0-9cI-yiKpCpOEhJJWBluWUzMo6K0YsSUlr0z5xB5gUIPwdvSoVZQhez9LAvbJGJM7zb7M-c1U8XLsE-P_7taBayqRFrsBL-FVytZ00Jz0_5UVMbWsMJIBFMXQWnRz41QJ7-O4sblWchYdVGomgx5oknDC1dnE79fNu3HB3ODDuVWgzsDn3-7KbiaZGN1zj-DpIbmDTKJljomALGrKPHuf_R9pyhGg1WecTsElO5XVSoss6V6VcHjzZ1Npa9L-1' }
  ];

  const favorites = [
    { name: 'Imperial Matcha', price: '$24.00', desc: 'Ceremonial Grade, Japan', tag: 'BEST SELLER', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpbD9wGvMcg8GLVEn_SGumiks7WdyN7x6V1pcQLB0jIoZYHTTPC0tUQjihU9ZMA8tfswjnbZ0fgrGXacs7tzEXpl4rln6hXUSyRmm_oKAxcJmBjYpHHpfJkRgkQbk0UJiEb4qm4enu2OSsuytmcilwX8UdwOGrvpW2J-0NVQWkZElJcvxzbceyOrHWeNYE3RA3JOEpDfl3kLma4IWTEs9yhWIuVi1mftFaRthUurRlMHlPCHHSNyrUx177SfX-J_nJkiBQwww_nIdf' },
    { name: 'Earl Grey Supreme', price: '$16.50', desc: 'Black Tea with Bergamot', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZBLHGSEEmSnk0iYNldBAfSDUfolpZ47Mqqj0pxPZ3lPCzXkcHTZO9iEvqyQ_3NzP_hyr9VCzvXeAzPVzXSIULvKG2x8PqmZM2m9Am_GgimYvyu4lQEyjse5S8qxPpZEKXwXa-kYaWkIBttkUpXnWViYaJToPbB5EkU_ECzf8d39JmqBkvPwk8th9amNRCo5Fqd7b59a-9XvhHF2QcGEwpYgJGWrtJbmgMUjR15wOblXSwAPfpHRF2um0TjvqgD0YOztyyl17Qjz30' },
    { name: 'Jasmine Pearls', price: '$22.00', desc: 'Hand-rolled Green Tea', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGRiK3XSIGRHorzk6WWg_gNXQCYfizZCV1UYhOrBxi3X50YKI69KQ_pItdDsslTOYmMYEHvt3nzN6TFx3g20N7hlpMbLyAm-4BcHz2c1WFIrukUZnDBpYelR09-_FEjUn7wru4JF3Ot8T820Nr2m_bzPmCqjj3i1Tv00ectZMMMtOXK0kUOBWOEjUgIMzvyX3TGQWkpOQse_3xhBDGKz16ak8qCcNDvPET8xBnuBikvakH4lcq8MPeNilOnpVPxPqkHeM0vPu6C4Pa' },
    { name: 'Aged Pu-erh', price: '$35.00', desc: 'Fermented, 2018 Vintage', tag: 'NEW', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGJxOODM_82_HKHum5B4_AEkuPro07maHXKTdOy8eI8FAFT_HDBKqURKZacXn3GItP2XvGQrLX-GDHtfHZeoELQ89s7nqPh_a5IaBMEy0QUQ6f2VBwjkYf_PzErc12fYok_8P0Gv0r2boe4mFYCgfCasE-1yqvUzAy0hQiQCKxmS7xxjHlpoo-m1_vOP-B--TTkI05JcyNeyape3sss8jbucTrPxMkYc9RuYyCXQIfnDgOwrZFRI5X-OVrTESe-A5T_Kszax1TKXT4' }
  ];

  return (
    <div className="bg-background-light text-[#0d1b10] font-display">
      
      <section 
        className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(16, 34, 19, 0.4), rgba(16, 34, 19, 0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-QEld4X1S--97xb7ejRo6k_02uYaxCC0rOOg4Mjin2J2IgK2uXKllg86nAnAzmMSCtJaqz2RRdeFMI7OvThqK1U0jw2QjrMYbI0DClDdptWqHUY3QkZoNzwtnuh0vqdM-qwM4wNBSc-4_HXGPjw5gxxhoasQamB9fnAiD9KTynNNE32ch7mU3wmTv7ctr773EJnpRi_qfNEepRt4Vko4SzNq4MwV3JXEZpjnWIcZw3kj1aYfRWKZnLuuFIrFAx2fwonTsnrikICw")` 
        }}
      >
        <div className="text-center px-4 max-w-3xl z-10">
          <h1 className="text-white text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-sm">
            Experience the <br/><span className="text-primary">Art of Calm</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-medium">
            Hand-picked organic teas sourced from the finest gardens, delivered fresh to your door.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/shop">
              <button className="bg-primary hover:bg-primary/90 text-[#0d1b10] px-8 py-3 rounded-lg font-bold transition-transform hover:scale-105 shadow-lg shadow-primary/25">
                Shop Collection
              </button>
            </Link>
            <Link to="/about">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-bold transition-all">
                Our Story
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 md:px-10 pt-16 pb-8">
        <div className="flex flex-col items-center mb-10">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">Discover</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Browse by Category</h2>
          <div className="h-1 w-20 bg-primary rounded-full mt-2"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <Link to="/shop" key={i} className="group relative overflow-hidden rounded-xl aspect-[4/5] md:aspect-square shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 block">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url("${cat.img}")` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 p-5 w-full flex flex-col gap-1">
                <p className="text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">{cat.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 md:px-10 pb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">This Week's Favorites</h2>
            <p className="text-gray-500 mt-2">Curated selection for the perfect brew.</p>
          </div>
          <Link to="/shop" className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {favorites.map((item, i) => (
            <Link to="/product/1" key={i} className="flex flex-col gap-3 group">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-light">
                {item.tag && (
                  <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-sm z-10 ${item.tag === 'BEST SELLER' ? 'bg-primary text-[#0d1b10]' : 'bg-white/90 text-[#0d1b10] backdrop-blur-md'}`}>
                    {item.tag}
                  </span>
                )}
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors cursor-pointer">{item.name}</h3>
                  <span className="font-bold">{item.price}</span>
                </div>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full bg-surface-light py-16 md:py-24">
        <div className="px-4 md:px-10 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeHbsJYGeTazYnwl-9JLA4yHKMpi11TvuMEWwpMuhnvevsR4Zw68n46KfsTp_3Q-3K_r3_XCQ3wdUmVialHw94vZfO_ACknPdfsavNcrDM2eap4tVA8K6desQj_BNYdCjFKwLBgvd77Prt7zsD1t7DMePlmPpODWJWAytD3i-wq7nmJi1lKpX3fhjsQQcWosks-q6lCAKgrc_RfQQWqTcEKchC6VGj9QyNSZwK6oo2URDkoSYV0QpM9oBGzyxHjo7i7703AL6u13n2" alt="Tea Setup" className="w-full h-full object-cover aspect-[4/3]" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6 items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-[#0d1b10] text-sm font-bold">
                <span className="material-symbols-outlined text-base">eco</span> Sustainable Sourcing
              </div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">From the Mountains to Your Cup</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We partner directly with small-scale tea gardens in Asia to bring you the freshest, ethically sourced leaves. Every sip tells a story of tradition, craftsmanship, and respect for nature.
              </p>
              <ul className="flex flex-col gap-3 mt-2">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary">check_circle</span> 100% Organic Certified</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary">check_circle</span> Plastic-free Packaging</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary">check_circle</span> Fair Trade Practices</li>
              </ul>
              <Link to="/about">
                <button className="mt-4 px-8 py-3 bg-[#0d1b10] text-white font-bold rounded-lg hover:bg-opacity-80 transition-opacity">
                  Read Our Mission
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 px-4 md:px-10 bg-background-light">
        <div className="max-w-[960px] mx-auto bg-gradient-to-br from-surface-light to-transparent rounded-3xl p-8 md:p-16 text-center border border-primary/20">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
            <span className="material-symbols-outlined text-3xl">mail</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Join the Tea Soul Community</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">Subscribe for exclusive offers, brewing tips, and early access to new harvests. Get 10% off your first order.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email address" className="flex-1 rounded-lg border-none bg-white px-4 py-3 focus:ring-2 focus:ring-primary outline-none shadow-sm" />
            <button type="button" className="bg-primary hover:bg-primary/90 text-[#0d1b10] font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

    </div>
  );
};

export default Home;