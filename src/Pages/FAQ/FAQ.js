import React, { useState } from 'react';

const FAQ = () => {
  const [openId, setOpenId] = useState('0-0');

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const faqData = [
    {
      category: 'Shipping',
      icon: 'local_shipping',
      items: [
        {
          q: 'How long does delivery take?',
          a: 'Standard shipping usually takes 5-8 business days within the country. Express shipping options are available at checkout and typically arrive in 1-3 business days.'
        },
        {
          q: 'Do you ship nationwide?',
          a: 'Yes! We ship nationwide, and we also offer international shipping to select countries including the US, Canada, UK, and Japan.'
        },
        {
          q: 'How can I track my order?',
          a: 'Once your order is processed and handed over to our shipping partners, you will receive an email containing a tracking number and a link to follow your package.'
        }
      ]
    },
    {
      category: 'Orders',
      icon: 'inventory_2',
      items: [
        {
          q: 'Can I modify my order after placing it?',
          a: 'We process orders quickly, but if you reach out to us within 2 hours of placing your order, we can usually make modifications or cancellations.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and secure digital wallet payments like Apple Pay and Google Pay.'
        },
        {
          q: 'Is there a minimum order amount?',
          a: 'There is no minimum order amount to purchase from TeaVault! However, orders over $50 automatically qualify for free standard shipping.'
        }
      ]
    },
    {
      category: 'Products',
      icon: 'spa',
      items: [
        {
          q: 'Are Teavault teas organic?',
          a: 'Yes, the vast majority of our teas are 100% certified organic. We work directly with sustainable farms that avoid synthetic pesticides and chemicals.'
        },
        {
          q: 'How should I store my tea?',
          a: 'To maintain peak freshness, store your tea in an airtight container in a cool, dark, and dry place away from strong odors and direct sunlight.'
        },
        {
          q: 'What\'s the shelf life of your teas?',
          a: 'When stored properly, our loose-leaf teas stay fresh for 12 to 24 months. Matcha and green teas are best consumed within 6 months of opening for the best flavor.'
        }
      ]
    },
    {
      category: 'Returns',
      icon: 'sync',
      items: [
        {
          q: 'Can I return or exchange my order?',
          a: 'We want you to love your tea. If you are unsatisfied, unopened products can be returned or exchanged within 30 days of delivery.'
        },
        {
          q: 'How do I initiate a return?',
          a: 'Simply contact our support team with your order number, and we will provide you with a return authorization and shipping instructions.'
        },
        {
          q: 'Who pays for return shipping?',
          a: 'If the return is due to an error on our part or a defective product, we cover the shipping. For general returns or changes of heart, the customer is responsible for return postage.'
        }
      ]
    }
  ];

  return (
    <div className="flex-1 w-full max-w-[1024px] mx-auto px-4 md:px-10 py-16 lg:py-24 font-display bg-background-light text-[#0d1b10] min-h-screen">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-lg font-medium">
          Everything you need to know about Teavault products, shipping, and our services.
        </p>
      </div>

      <div className="space-y-12 mb-20">
        {faqData.map((section, secIdx) => (
          <div key={secIdx} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">{section.icon}</span>
              </div>
              <h2 className="text-2xl font-black text-[#0d1b10]">{section.category}</h2>
            </div>
            
            <div className="flex flex-col gap-3">
              {section.items.map((item, itemIdx) => {
                const id = `${secIdx}-${itemIdx}`;
                const isOpen = openId === id;
                
                return (
                  <div 
                    key={id} 
                    className={`bg-white rounded-2xl border ${isOpen ? 'border-primary shadow-md' : 'border-gray-100 shadow-sm'} overflow-hidden transition-all duration-300`}
                  >
                    <button 
                      onClick={() => toggleAccordion(id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-surface-light transition-colors"
                    >
                      <span className="font-bold text-[#0d1b10] pr-8">{item.q}</span>
                      <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    <div 
                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="h-px w-full bg-gray-100 mb-4"></div>
                      <p className="text-gray-600 font-medium leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-light rounded-3xl p-10 md:p-16 text-center border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-black text-[#0d1b10] mb-4">Still have questions?</h2>
        <p className="text-gray-600 font-medium mb-8">
          Our team is here to help. Reach out anytime via phone or email.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a href="tel:0357130804" className="flex items-center gap-2 text-primary hover:text-green-600 transition-colors font-bold">
            <span className="material-symbols-outlined text-[20px]">call</span>
            0357 130 804
          </a>
          <span className="hidden sm:block text-gray-300">|</span>
          <a href="mailto:teavault2025@gmail.com" className="flex items-center gap-2 text-gray-500 hover:text-[#0d1b10] transition-colors font-bold">
            <span className="material-symbols-outlined text-[20px]">mail</span>
            teavault2025@gmail.com
          </a>
        </div>
      </div>

    </div>
  );
};

export default FAQ;