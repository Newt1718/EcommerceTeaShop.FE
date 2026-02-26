import React from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const products = [
    {
      id: 1,
      name: 'Imperial Matcha',
      origin: 'Uji, Japan',
      rating: '4.9',
      price: '$28.00',
      size: '30g Tin',
      desc: 'Vibrant green ceremonial grade powder with distinct umami notes.',
      badge: 'Best Seller',
      badgeColor: 'bg-primary text-[#0d1b10]',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAacKjJEwsR2ONaRZe8c_yYC9f2EaBCNBdkoeD3rk5u_YLjwLTTHq3caX4VBTeFhwaZhCXMwfx1uede07YocpZfbz3zSm4dDTeMArH9il756PAY_KRPdxzaH7dSLsSkDuSCWtylICi5fyAIpFKVpfHoYqtkzrNVIw_LC_8kxSc_G2hCDK6BjEVeFI1QeS40XT_nN2m1HECvuM5iS1ISCqku9IWzMdPOmlERjwo-TyhEFiRMMCsyrVn_rvuE28vZW2_9hVi6b426Ln22'
    },
    {
      id: 2,
      name: 'Sencha Reserve',
      origin: 'Shizuoka, Japan',
      rating: '4.7',
      price: '$16.50',
      size: '100g Bag',
      desc: 'Deep steamed green tea with a rich, grassy aroma and sweet finish.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLUAXmxJa8DR4Q4uI5HFGdZtwiPKB7eoAoCnBvpW-BQoM1Zo9gg1tYHsDXr4sop91GdPYo1i2PgmFpu2MFkfigzm4Y-_Esgcs5I26KBFWQ7t4gpx4z9emSFR_4mnQjeYJlzK2BcJnlxCyLdWq5r41U6Z9jXvU-IV9d05fjKmc964yzzE4Ej4LLPxviPV0sAm_WElsB9OnJttyMUq93CJXuA0vPn41iIDrrG7pq8D5T-8MznrvcY1lAcKo3Z2TNgWl0pn6Qs-i5Q7af'
    },
    {
      id: 3,
      name: 'Jasmine Pearls',
      origin: 'Fujian, China',
      rating: '4.8',
      price: '$22.00',
      oldPrice: '$28.00',
      size: '50g Tin',
      desc: 'Hand-rolled tea pearls infused with fresh jasmine blossoms.',
      badge: 'Sale',
      badgeColor: 'bg-red-500 text-white',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa3a1VM20Me0D-3SLjzYpzZuu8aEkA4-vCSPOPpQo3In4iq_18dE872EXoIp1MWh5eXsQ6o4jYb-C4wbgYlG1v4Vdi01oZBANGqrtuipcK2HRgI8z4zPAvf4iVdk86RDe2HgjQSaaiZAoMjuOF_apnjHd94kDl7kO8Kscg9TmSwOMDn0ZbM_gsNB7C3QMuxRu7EbU0QRVfjKoBdzaz5T6zOAd67ZtQzxVc2elQMmcRmJAx_BFaIS76wHrBEI1Nb6MUCyDSCuAdB7ep'
    },
    {
      id: 4,
      name: 'Milk Oolong',
      origin: 'Taiwan',
      rating: '5.0',
      price: '$32.00',
      size: '75g Bag',
      desc: 'Naturally creamy and smooth with a distinct floral aroma.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeJTOy1I4Hrk7_GpxYikfBfw1GNqzV1vdbvGwtAVUTCu_BRorMewJc_U7jORsfmWUJd7FR5ZWPR5kAR3RMd_u5Ef7-nwhvuUE7Gcivry2wqpKXFLOKSl6B0Z5HtW0_NjsjYMLk2lNi2M7TfvE4w3MF84YXMcE9iKFJk07V7YeF60iIEEc3EoFeEACDdFGDqOqHwTBV0IbWKIb0nNo7W13prt5sNl7iasXLmnIMTYAKLcrtR6ZYrjcka9KhzhYgUbrFG-kZjkiPv0O1'
    },
    {
      id: 5,
      name: 'Earl Grey Superior',
      origin: 'Assam, India',
      rating: '4.6',
      price: '$14.00',
      size: '100g Bag',
      desc: 'A bold black tea blend featuring premium bergamot oil.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGsQ67LpE7LXnpncD0HODoayKRWX6J_SFC8NxrHG6LFL5b3qzAwmaSds7iSTxnayAEJDivWLzxZzdQC1WZDb1HfDA4cCpG83ZR5eWWluPFWBdTs0_if-ChNFtdz1UU3jqwPonq_G-0DMlZmLxYEGjfzKqpvDWE_04IBqkw_MrpdvutW5A_v2WbgC7JQMod4YkObI64yM8qBm-yD9Q9txm4JpYShY_D4CHFzwmNv4hnWTyIHabp-iNPqeSg2efq5OOhxN-3ObE_wp3B'
    },
    {
      id: 6,
      name: 'Kyoto Genmaicha',
      origin: 'Kyoto, Japan',
      rating: '4.9',
      price: '$18.00',
      size: '100g Bag',
      desc: 'Green tea combined with roasted popped brown rice.',
      badge: 'Limited',
      badgeColor: 'bg-gray-900/80 text-white backdrop-blur-sm',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3OGReXx6tkaV-I_QekT7XrthlnELOXvauVdZwPjMQPmW6uUzVCcaz3f7l_aTa77DyauV38857t9ErJbPObX1BV47Q0EhbvFHHO4-a-LuQDkTGqEYq77CrSKRhuv-uVDjU0x-QnAkJ48a90TJG6DML_zdSRYByHq4BSZQpbX2pmD9MWVPyrlI-EuEmOeffSYuzlwU5zHmEoevWrVGLzDnYjqLA5hRuudv2CwSpqKhpjv-uvoaxTcGomd2AYOCdUP1UOWqQ5KR5wS_w'
    }
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-20 font-display bg-background-light text-[#0d1b10]">
      
      <div className="w-full max-w-[1440px] px-4 md:px-10 py-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined !text-[14px] text-gray-400">chevron_right</span>
          <span className="font-bold text-[#0d1b10]">Shop All</span>
        </div>
      </div>

      <div className="w-full max-w-[1440px] px-4 md:px-10 mb-8">
        <div 
          className="relative overflow-hidden rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to right, rgba(248, 252, 249, 0.95), rgba(248, 252, 249, 0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-QEld4X1S--97xb7ejRo6k_02uYaxCC0rOOg4Mjin2J2IgK2uXKllg86nAnAzmMSCtJaqz2RRdeFMI7OvThqK1U0jw2QjrMYbI0DClDdptWqHUY3QkZoNzwtnuh0vqdM-qwM4wNBSc-4_HXGPjw5gxxhoasQamB9fnAiD9KTynNNE32ch7mU3wmTv7ctr773EJnpRi_qfNEepRt4Vko4SzNq4MwV3JXEZpjnWIcZw3kj1aYfRWKZnLuuFIrFAx2fwonTsnrikICw")` }}
        >
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 text-[#0d1b10]">
              Explore Our <span className="text-primary">Premium</span> Collection
            </h1>
            <p className="text-lg text-gray-700 font-medium max-w-xl">
              Hand-picked loose leaf and bagged teas sourced directly from the finest gardens in Japan, China, and India. Experience the art of tea.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1440px] px-4 md:px-10 flex flex-col lg:flex-row gap-8 items-start">
        
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">tune</span> Filters
            </h3>
            <button className="text-xs text-gray-500 hover:text-primary font-bold">Reset</button>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-black mb-4 uppercase tracking-widest text-gray-400">Tea Type</h4>
            <div className="space-y-3">
              {['Green Tea', 'Black Tea', 'Oolong', 'Herbal'].map((type, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary/20 bg-transparent" />
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6 border-t border-gray-100 pt-6">
            <h4 className="text-xs font-black mb-4 uppercase tracking-widest text-gray-400">Origin</h4>
            <div className="space-y-3">
              {['Japan (Uji)', 'China (Fujian)', 'India (Assam)'].map((origin, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary/20 bg-transparent" />
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">{origin}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h4 className="text-xs font-black mb-4 uppercase tracking-widest text-gray-400">Price Range</h4>
            <input type="range" min="0" max="100" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
            <div className="flex justify-between mt-2 text-xs font-bold text-gray-400">
              <span>$0</span>
              <span>$100+</span>
            </div>
          </div>
        </aside>

        <div className="flex-1 w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <div className="flex h-8 items-center justify-center gap-x-2 rounded-full border border-primary/30 bg-primary/10 pl-3 pr-2">
                <p className="text-[#0d1b10] text-xs font-bold">Green Tea</p>
                <button className="hover:text-red-500"><span className="material-symbols-outlined !text-[16px]">close</span></button>
              </div>
              <button className="text-xs font-bold underline text-gray-500 hover:text-primary ml-1">Clear all</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-medium">Sort by:</span>
              <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer text-[#0d1b10] py-0 pl-0">
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <Link to="/product/1" key={item.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-light">
                  <img src={item.img} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  
                  {item.badge && (
                    <div className={`absolute top-3 left-3 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${item.badgeColor}`}>
                      {item.badge}
                    </div>
                  )}
                  
                  <button className="absolute bottom-3 right-3 h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-[#0d1b10]">
                    <span className="material-symbols-outlined !text-[20px]">shopping_bag</span>
                  </button>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-primary uppercase tracking-wide">{item.origin}</p>
                    <div className="flex items-center gap-1 text-amber-400">
                      <span className="material-symbols-outlined !text-[14px] font-variation-settings-'FILL'1">star</span>
                      <span className="text-xs font-bold text-gray-500">{item.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.desc}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <span className={`font-black text-lg ${item.oldPrice ? 'text-red-500' : ''}`}>{item.price}</span>
                      {item.oldPrice && (
                        <span className="text-sm text-gray-400 line-through decoration-1">{item.oldPrice}</span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-gray-400">{item.size}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-light text-gray-500 transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
              <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-[#0d1b10] font-bold shadow-md">1</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-light text-gray-500 font-bold transition-colors">2</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-light text-gray-500 font-bold transition-colors">3</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-light text-gray-500 transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
            </nav>
          </div>

        </div>
      </div>

      <div className="w-full max-w-[1440px] px-4 md:px-10 mt-16">
        <div 
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 shadow-sm border border-gray-100 bg-cover bg-center flex items-center justify-center text-center"
          style={{ backgroundImage: `linear-gradient(rgba(13, 27, 16, 0.7), rgba(13, 27, 16, 0.8)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDeHbsJYGeTazYnwl-9JLA4yHKMpi11TvuMEWwpMuhnvevsR4Zw68n46KfsTp_3Q-3K_r3_XCQ3wdUmVialHw94vZfO_ACknPdfsavNcrDM2eap4tVA8K6desQj_BNYdCjFKwLBgvd77Prt7zsD1t7DMePlmPpODWJWAytD3i-wq7nmJi1lKpX3fhjsQQcWosks-q6lCAKgrc_RfQQWqTcEKchC6VGj9QyNSZwK6oo2URDkoSYV0QpM9oBGzyxHjo7i7703AL6u13n2")` }}
        >
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-4xl mb-4">eco</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Sustainable & Ethically Sourced</h2>
            <p className="text-gray-200 font-medium mb-8">
              Every blend in our vault is carefully vetted by tea masters to ensure unparalleled quality and environmental harmony.
            </p>
            <Link to="/about">
              <button className="bg-primary hover:bg-primary/90 text-[#0d1b10] font-black px-8 py-3 rounded-xl transition-transform hover:scale-105 shadow-lg shadow-primary/20">
                Learn About Our Process
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Shop;