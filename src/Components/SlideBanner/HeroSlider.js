// ...existing code...
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const slides = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-QEld4X1S--97xb7ejRo6k_02uYaxCC0rOOg4Mjin2J2IgK2uXKllg86nAnAzmMSCtJaqz2RRdeFMI7OvThqK1U0jw2QjrMYbI0DClDdptWqHUY3QkZoNzwtnuh0vqdM-qwM4wNBSc-4_HXGPjw5gxxhoasQamB9fnAiD9KTynNNE32ch7mU3wmTv7ctr773EJnpRi_qfNEepRt4Vko4SzNq4MwV3JXEZpjnWIcZw3kj1aYfRWKZnLuuFIrFAx2fwonTsnrikICw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDeHbsJYGeTazYnwl-9JLA4yHKMpi11TvuMEWwpMuhnvevsR4Zw68n46KfsTp_3Q-3K_r3_XCQ3wdUmVialHw94vZfO_ACknPdfsavNcrDM2eap4tVA8K6desQj_BNYdCjFKwLBgvd77Prt7zsD1t7DMePlmPpODWJWAytD3i-wq7nmJi1lKpX3fhjsQQcWosks-q6lCAKgrc_RfQQWqTcEKchC6VGj9QyNSZwK6oo2URDkoSYV0QpM9oBGzyxHjo7i7703AL6u13n2",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBpbD9wGvMcg8GLVEn_SGumiks7WdyN7x6V1pcQLB0jIoZYHTTPC0tUQjihU9ZMA8tfswjnbZ0fgrGXacs7tzEXpl4rln6hXUSyRmm_oKAxcJmBjYpHHpfJkRgkQbk0UJiEb4qm4enu2OSsuytmcilwX8UdwOGrvpW2J-0NVQWkZElJcvxzbceyOrHWeNYE3RA3JOEpDfl3kLma4IWTEs9yhWIuVi1mftFaRthUurRlMHlPCHHSNyrUx177SfX-J_nJkiBQwww_nIdf",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCGRiK3XSIGRHorzk6WWg_gNXQCYfizZCV1UYhOrBxi3X50YKI69KQ_pItdDsslTOYmMYEHvt3nzN6TFx3g20N7hlpMbLyAm-4BcHz2c1WFIrukUZnDBpYelR09-_FEjUn7wru4JF3Ot8T820Nr2m_bzPmCqjj3i1Tv00ectZMMMtOXK0kUOBWOEjUgIMzvyX3TGQWkpOQse_3xhBDGKz16ak8qCcNDvPET8xBnuBikvakH4lcq8MPeNilOnpVPxPqkHeM0vPu6C4Pa",
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [paused, slides.length]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div
      className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          style={{
            backgroundImage: `linear-gradient(rgba(16,34,19,0.4), rgba(16,34,19,0.7)), url("${src}")`,
          }}
          aria-hidden={i !== index}
        />
      ))}

      <div className="relative z-20 text-center px-4 max-w-3xl">
        <h1 className="text-white text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-sm">
          Experience the <br />
          <span className="text-primary">Art of Calm</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-medium">
          Hand-picked organic teas sourced from the finest gardens, delivered
          fresh to your door.
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

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
        aria-label="Previous slide"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
        aria-label="Next slide"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-primary" : "bg-white/40"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
