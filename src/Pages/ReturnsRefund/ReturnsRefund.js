import React from 'react';

const ReturnsRefund = () => {
  const policies = [
    {
      icon: 'assignment_return',
      title: 'Eligibility for Returns',
      desc: 'Products can be returned within 7 days of receipt if they are unopened, unused, and in their original packaging. We want to ensure that every product meets your expectations and maintains the highest quality standards.'
    },
    {
      icon: 'do_not_disturb_alt',
      title: 'Non-returnable Items',
      desc: 'Opened tea packages or products damaged by improper storage are not eligible for return. This policy ensures the quality and safety of all products we offer to our valued customers.'
    },
    {
      icon: 'support_agent',
      title: 'Return Process',
      desc: 'Contact our support team with your order ID and reason for return. Once approved, we will guide you through the return steps with clear instructions to make the process as smooth as possible.'
    },
    {
      icon: 'history',
      title: 'Refund Timeline',
      desc: 'Refunds will be processed within 5–7 business days after the returned item is received and inspected. We\'ll notify you via email once your refund has been initiated.'
    },
    {
      icon: 'swap_horiz',
      title: 'Exchange Option',
      desc: 'You may choose to exchange for another product of equal or lesser value if available. Simply let us know your preference when initiating the return process, and we\'ll help you find the perfect alternative.'
    }
  ];

  return (
    <div className="bg-background-light text-[#0d1b10] font-display min-h-screen">
      
      <section 
        className="relative h-[350px] lg:h-[450px] flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: `linear-gradient(rgba(13, 27, 16, 0.7), rgba(13, 27, 16, 0.8)), url("https://images.unsplash.com/photo-1576092762791-dd9e2220cad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")` }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-white text-4xl lg:text-6xl font-black mb-4 tracking-tight">Returns & Refund Policy</h1>
          <p className="text-gray-200 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Our priority is your satisfaction through transparent and efficient returns.
          </p>
        </div>
      </section>

      <section className="max-w-[1024px] mx-auto px-4 md:px-10 py-16 lg:py-24">
        <div className="space-y-6">
          {policies.map((policy, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-14 h-14 rounded-full bg-surface-light flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">{policy.icon}</span>
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-xl font-black mb-3 text-[#0d1b10]">{policy.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{policy.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[800px] mx-auto px-4 md:px-10 pb-16 lg:pb-24">
        <div className="bg-surface-light rounded-[2.5rem] p-10 text-center border border-gray-200 flex flex-col items-center">
          <h2 className="text-2xl font-black text-[#0d1b10] mb-4">Need Assistance with Returns?</h2>
          <p className="text-gray-600 font-medium mb-8">For assistance with returns, please contact us:</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#0d1b10] font-bold mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">call</span>
              0357 130 804
            </div>
            <div className="hidden sm:block text-gray-300">•</div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">mail</span>
              teavault2025@gmail.com
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
            <span className="material-symbols-outlined !text-[18px]">location_on</span>
            65D, 63 Lò Lu, Phường Trường Thạnh, TP. Thủ Đức, Hồ Chí Minh
          </div>
        </div>
      </section>

    </div>
  );
};

export default ReturnsRefund;