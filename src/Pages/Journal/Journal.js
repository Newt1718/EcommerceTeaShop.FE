import React from 'react';
import { Link } from 'react-router-dom';

const Journal = () => {
  const articles = [
    {
      id: 1,
      category: 'Wellness',
      date: 'April 12, 2024',
      readTime: '5 min read',
      title: 'Benefits of Oolong Tea for Heart Health',
      desc: 'New research suggests that a daily cup of Oolong can significantly lower cholesterol levels...',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDKRTyVz7dd9bxyLv3Lf4DZsy3cWAG0uGqantT8F7Wl0n7KXIEOlg7FutmSBQe45ZQmXPklk7ROrElgqcCVJkcC3WtLXQp755DqCe6u6su2Z3zrTlokYpZt2_duwJpqrhyCGEqUGIOMvE3n46fI-44GnncrOo-JAqwsDpgRansTZymZpS3MvCuUDxtqp46juGDBe5v11HmDMyLt84avwSGqaLVj6lo1vKLwuVD87kiV4yfpkQs47FYQHmT-eZTusKfvJDSa9SLdxjT'
    },
    {
      id: 2,
      category: 'Tradition',
      date: 'April 08, 2024',
      readTime: '8 min read',
      title: 'The History of the Japanese Tea Ceremony',
      desc: 'Exploring the profound spiritual roots and technical mastery of Chanoyu, the way of tea...',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtpgP2EgoktGk0RKogqPkO5LxahdcOEFXI8cpfj0kNrWhEPCx7AG-8yn8Yg5LBPrF0fJzzh_AjSRLrBieMQ3QjK8XwUhljgZ8HJob3-66cn8iytCTusqPr7UN7iGrbi-LXmgY3-VkW1PcXE8NziQIvX0dCzdEuBS4tXfCuQnD0YACzYBiUzVEJ3AtOG6PouhT9JFHq1vTk_fSw0fcIOgQPxlwb74d40VR2RQaHCMbz6INOHJPx2olimiYv9MlDYIswTKE4L04LNEb3'
    },
    {
      id: 3,
      category: 'Tutorial',
      date: 'April 05, 2024',
      readTime: '3 min read',
      title: 'Water Temperature: The Secret to Better Flavor',
      desc: 'Stop burning your green tea. Learn the specific temperatures for every variety of leaf...',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVuPpQZJmXNuYMMsiFQNt-xooBYyyB_wesNi4RGlDHMoQ8w9m7WNruW5yzFEJTGmKHqCXYqa0N-d8Y7xyhh_rF10DHPcvZmhbZgr3t9XWCLwpNJsbTXpgV_7mZXzF31Dk--_1SHWIFZmoPenLWkMCqm9wwauYC5-drllIg5aLao-fzdCUieHKOv8qYLvbwaF2srRfRBi9kyTdUonaDeUBLWvFbEwJyhaWJ2gnSlOS_3NdEhmvIez5EfdG4ltp_KN5eZ4d86q9YXFny'
    },
    {
      id: 4,
      category: 'Sourcing',
      date: 'March 28, 2024',
      readTime: '12 min read',
      title: 'Spring Harvest 2024: A Trip to Darjeeling',
      desc: 'An exclusive look at this year\'s first flush and the incredible families harvesting it...',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6-GO3bel_ztFUMh7MWSHSFVzn_AXH0UnLlp380j_-1DHtaF_ZuVioVt3bxiFbalOr78WdYSAlPwcqa8zvoHaHdhJSL1WG-Gz86cKZRIzFuiOueksWgxKnTMS6lQMHYsaBc7jS2Z99nOzmYI35LSnQnOM9enNVswQ-9SNMkS0js1CTVSI-6szIdoRnuak2Qd58So-3yinNRD_WvZCQWlXjjNrGqKHfTis5oag2l-UT6UXgsVJwMqPbJba5SUIxlYZMjjKnl7cuiql8'
    },
    {
      id: 5,
      category: 'Culture',
      date: 'March 22, 2024',
      readTime: '6 min read',
      title: 'The Fascinating Tale of Earl Grey Tea',
      desc: 'How a British diplomat and Bergamot oranges created one of the world\'s most iconic flavors...',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB21X5QM8_vyKyNKHqgj7_wVX3lKgywA3pNjEsY0dnwA_vMkUAVYOI9TnaQ0dvapFRUKgWaVQmGgS-Md1sJixpg43VtC1vZN2Zk_45mYS4pVzOVSQ3VaJqHApn5T0BufwtXUupAWVp5ArilJQ6yjSnMsoR4gAe6IOGX4mIzpa_8_O9TJ9dbgvEAJexUAWNIRcDFwBfC6Y_KWNSj8GWEWwleh8oub9d9mag8dZufaCNYWejDMZXzJGg6jy_fzr6cflRbfX97fKFDsuXE'
    },
    {
      id: 6,
      category: 'Health',
      date: 'March 15, 2024',
      readTime: '4 min read',
      title: '5 Herbal Teas for Better Sleep Tonight',
      desc: 'Say goodbye to restless nights with these naturally caffeine-free infusions that soothe the mind...',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_8d_yp0AsNrWuFAl4NfFOMcZY9TWMI2wU21MpBk0xN4eodZWS0xgMU3WlRtRJIs-XWm9Gqcv9lx_DIkIaesbGmMi6B0xbStNe-zQ_Ool5j6lOsES4LE6mLbTvGus4RXpl7VXOclpJJMI0finUhZz3j2y_6eh5Glab1HmY94upnzQXZIYErxGEiUpPRhOD3R4FY24-WiZeyzo3aqW1z33dTs7OE_NV_T05Logl-I3ST4R3djZMvECIUN3A4itSlCe9dnxQRvpEPCG4'
    }
  ];

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-8 lg:py-12 font-display bg-background-light text-[#0d1b10] min-h-screen relative">
      
      <section className="relative rounded-3xl overflow-hidden mb-12 group shadow-sm">
        <div 
          className="min-h-[320px] lg:min-h-[450px] bg-cover bg-center flex flex-col justify-end p-8 lg:p-12 relative" 
          style={{ backgroundImage: 'linear-gradient(180deg, rgba(13, 27, 16, 0) 0%, rgba(13, 27, 16, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCU4X0WY4ypx5BNXN9-o0u2U3-yhPh8UZkkprTvxpmGJEai7byOc97drkFrNTyJTQiA4LQ-9WnPNOTpYDkDqp4a1qjhK5dO90SJarqP7O5pMae56zXKqoYUMELMTewc_5Jl9Y2b7DtK6XZRzhhVIcbgSj-JtLF1ozEZCIWKdBeOLzoZGZ1Vks1WwtcB1QjyIn2u2QzzNnNtbtvW42gjImwO8UkKf5JtV95RpEp-6ugE8Cbrzjvg8mb5dn48FLsd7O2NpPo1a8baK8F4")' }}
        >
          <div className="max-w-2xl relative z-10">
            <span className="bg-primary text-[#0d1b10] text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest mb-4 inline-block shadow-sm">
              Featured Post
            </span>
            <h2 className="text-white text-3xl lg:text-5xl font-black leading-tight mb-4 tracking-tight">
              The Zen of Morning Matcha: A Modern Ritual
            </h2>
            <p className="text-gray-200 text-lg mb-8 font-medium line-clamp-2">
              Discover why thousands of tea lovers are switching their morning coffee for a meditative matcha ceremony and how it transforms productivity.
            </p>
            <button className="bg-white text-[#0d1b10] px-8 py-3.5 rounded-xl font-black flex items-center gap-2 hover:bg-primary transition-colors shadow-lg shadow-black/20">
              Read the Article <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <button className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-[#0d1b10] text-white font-bold text-sm shadow-sm">All Posts</button>
            <button className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-[#0d1b10] transition-colors font-bold text-sm">Green Tea</button>
            <button className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-[#0d1b10] transition-colors font-bold text-sm">Black Tea</button>
            <button className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-[#0d1b10] transition-colors font-bold text-sm">Herbal</button>
            <button className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-[#0d1b10] transition-colors font-bold text-sm">Brewing Tips</button>
            <button className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-[#0d1b10] transition-colors font-bold text-sm">Culture</button>
          </div>
          <div className="relative min-w-[280px]">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
            <input className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[#0d1b10] font-medium placeholder:text-gray-400" placeholder="Search articles..." type="text" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link to={`/journal/${article.id}`} key={article.id} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
            <div className="relative aspect-[4/3] overflow-hidden bg-surface-light">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${article.img}")` }}></div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest text-[#0d1b10] shadow-sm">
                {article.category}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-gray-400 text-xs mb-3 font-bold">
                <span>{article.date}</span>
                <span className="w-1 h-1 bg-primary rounded-full"></span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors leading-snug text-[#0d1b10]">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm mb-6 flex-1 font-medium leading-relaxed">
                {article.desc}
              </p>
              <div className="text-primary font-black text-sm flex items-center gap-1 group/link mt-auto">
                Read More <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">chevron_right</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 flex justify-center items-center gap-2">
        <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-100 text-gray-400 hover:text-primary hover:border-primary transition-colors bg-white">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#0d1b10] text-white font-black shadow-md">1</button>
        <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-100 text-gray-500 hover:border-primary transition-colors font-bold bg-white">2</button>
        <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-100 text-gray-500 hover:border-primary transition-colors font-bold bg-white">3</button>
        <span className="px-2 text-gray-400 font-bold">...</span>
        <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-100 text-gray-500 hover:border-primary transition-colors font-bold bg-white">12</button>
        <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-100 text-gray-400 hover:text-primary hover:border-primary transition-colors bg-white">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

    </div>
  );
};

export default Journal;