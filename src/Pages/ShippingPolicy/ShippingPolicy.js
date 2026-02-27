import React from 'react';

const ShippingPolicy = () => {
  const policies = [
    {
      icon: 'schedule',
      title: 'Processing Time',
      desc: 'Orders are processed within 1-2 business days after confirmation. During high-demand periods, processing may take slightly longer. We appreciate your patience as we carefully prepare each order with care.'
    },
    {
      icon: 'local_shipping',
      title: 'Shipping Methods',
      desc: 'We offer standard and express shipping options through trusted couriers nationwide. Choose the delivery speed that best suits your needs at checkout.'
    },
    {
      icon: 'location_on',
      title: 'Estimated Delivery Time',
      desc: '',
      list: [
        { label: 'Inner-city HCMC:', value: '1-2 days' },
        { label: 'Other provinces:', value: '2-5 days' }
      ]
    },
    {
      icon: 'payments',
      title: 'Shipping Fees',
      desc: 'Shipping fees are calculated based on order weight and delivery location.',
      highlight: '✨ Free shipping for orders over 500,000đ'
    },
    {
      icon: 'share_location',
      title: 'Order Tracking',
      desc: 'Once shipped, customers receive a tracking code via email or SMS for real-time order tracking. Stay informed every step of the way as your order travels to you.'
    },
    {
      icon: 'inventory_2',
      title: 'Lost or Damaged Packages',
      desc: 'Please contact our support team immediately if your package is lost or damaged during transit. We\'ll work with you to resolve the issue promptly and ensure your satisfaction.'
    }
  ];

  return (
    <div className="bg-background-light text-[#0d1b10] font-display min-h-screen">
      
      <section 
        className="relative h-[350px] lg:h-[450px] flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: `linear-gradient(rgba(13, 27, 16, 0.6), rgba(13, 27, 16, 0.8)), url("https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")` }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-white text-4xl lg:text-6xl font-black mb-4 tracking-tight">Shipping Policy</h1>
          <p className="text-gray-200 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Our commitment to timely and safe delivery.
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
                {policy.desc && <p className="text-gray-600 font-medium leading-relaxed">{policy.desc}</p>}
                
                {policy.list && (
                  <ul className="mt-2 space-y-2">
                    {policy.list.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="font-bold text-[#0d1b10]">{item.label}</span> {item.value}
                      </li>
                    ))}
                  </ul>
                )}
                
                {policy.highlight && (
                  <div className="mt-4 inline-block bg-primary/10 border border-primary/20 text-[#0d1b10] font-bold text-sm px-4 py-2 rounded-lg">
                    {policy.highlight}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[800px] mx-auto px-4 md:px-10 pb-16 lg:pb-24">
        <div className="bg-surface-light rounded-[2.5rem] p-10 text-center border border-gray-200">
          <h2 className="text-2xl font-black text-[#0d1b10] mb-4">Questions About Shipping?</h2>
          <p className="text-gray-600 font-medium mb-8">Feel free to contact us — we're here to help.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#0d1b10] font-bold">
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
        </div>
      </section>

    </div>
  );
};

export default ShippingPolicy;