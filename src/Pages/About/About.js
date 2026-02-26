import React from "react";

const About = () => {
  return (
    <div className="flex flex-col flex-1 w-full bg-background-light text-[#0d1b10] font-display">
      <div className="@container w-full">
        <div
          className="flex min-h-[500px] md:min-h-[600px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-8 text-center relative"
          style={{
            backgroundImage:
              'linear-gradient(rgba(16, 34, 19, 0.4) 0%, rgba(16, 34, 19, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-PCttBqbQpcYlIB9Ctvi8UscLzMkR1DkqEfnms983XnTuN0sSziGMOossjpjQW3sGkHxIRydUIqhfO9pR6h39VldzwvFLbHugKOmNcpvPo8aLno-s84GuQDEXH7-FjbCSYsH2QSE6ZHUNyZYPmHkG1xCXKM-w4Ni-rs9doOiFZpZJKhYMRsCB4Dy3CaHIwB-DTPtCyg71UYuYYSrZ5mxAwvB1pEmIMSypO-iDIEXtO8BghfYX6KV4_inx_PkAil2PuLvHaMdg4yj8")',
          }}
        >
          <div className="flex flex-col gap-4 max-w-3xl z-10">
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
              Brewing a Better World
            </h1>
            <h2 className="text-gray-100 text-base md:text-xl font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              From the misty hills of Darjeeling to your cup, we are dedicated
              to cultivating connection through sustainable, organic tea.
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-1 justify-center py-16 px-4 md:px-10">
        <div className="flex flex-col max-w-[1024px] flex-1 gap-16 md:gap-24">
          <section className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span className="text-primary font-bold tracking-wider text-sm uppercase">
                  Our Origins
                </span>
                <h2 className="text-[#0d1b10] text-3xl md:text-4xl font-bold leading-tight">
                  It started in a small kitchen with big dreams.
                </h2>
                <p className="text-[#0d1b10]/80 text-lg font-normal leading-relaxed">
                  We traveled across continents to find the perfect leaves,
                  building relationships with farmers who share our passion for
                  purity. What began as a personal quest for the perfect cup has
                  grown into a community of tea lovers dedicated to quality and
                  transparency.
                </p>
              </div>
              <div className="flex gap-4 pt-2">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-[#0d1b10]">10+</span>
                  <span className="text-sm text-gray-500">
                    Years of Sourcing
                  </span>
                </div>
                <div className="w-px bg-gray-200 h-12"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-[#0d1b10]">50+</span>
                  <span className="text-sm text-gray-500">Partner Farms</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKJdzF7Ri7bZSSF4jWpXAtc_tWrIR1J7z20tMu-vKKeazzapSV5qQna2zIF1tPnJsdvdDIPn8eu_gaB43oTNWMQvaD_lqQewGThjtekB7Zk5miTe4ZE3v0A7xY-7iV7evJ3KLBU6LmT0dbtKeb02-byTO9LqV17KCtZNwNLARXXpbq5m5dtLOyWzpYzxHgSRHOMDE61jNOQJNzH2PYuo5kR3g_fXNHP9eazn0R-DUxXeCM_mIyCigS62bVD2puA948KZrQhIfR4n-A")',
                  }}
                ></div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px bg-primary w-8"></div>
                <p className="text-primary text-sm font-medium">
                  Fair Trade Certified Estates
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-10">
            <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
              <h2 className="text-[#0d1b10] text-3xl md:text-4xl font-bold">
                Our Values
              </h2>
              <p className="text-[#0d1b10]/80 text-lg">
                Sustainability isn't just a buzzword. It's our soil. We believe
                in transparency, purity, and community in every sip.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    eco
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#0d1b10] text-xl font-bold">
                    Organic Sourcing
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    100% organic certified farms without harmful pesticides. We
                    respect the earth that provides for us.
                  </p>
                </div>
              </div>

              <div className="group flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    recycling
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#0d1b10] text-xl font-bold">
                    Zero Waste
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Biodegradable packaging that leaves no trace. From the box
                    to the bag, everything returns to nature.
                  </p>
                </div>
              </div>

              <div className="group flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    volunteer_activism
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#0d1b10] text-xl font-bold">
                    Hand Picked
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Selected by hand to ensure only the best leaves make it into
                    your morning ritual.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-[#0d1b10] text-3xl font-bold">
                The Tea Sommeliers
              </h2>
              <p className="text-gray-500">
                Meet the passionate people behind your daily brew.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-3">
                <div
                  className="w-full aspect-[3/4] rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZjuzjVHcQMInXy9_Mj9LUrvdScXI7LQUH4UwCMFssWubh9cu_SUTAypcfRMqoADrz-ZRq2l4iv7ltQ4wpzaPOgmqoE2xxl3IqrrJJwaJPvzy1H8G84mDt3gVTtIdn_e8pxEvy4eFkg46MUrhb1fIZ_-9CXLp-XG6ESHfcDi3Jh1J1kQyRh4AeMPT1qBR0dLiTImwe2JTbLWzy7KATHjE2VxCH0lzD5eChPV2Dusq8ejZtO6F_z1AsBWWQiffCKmI10fNX76fD70Ba")',
                  }}
                ></div>
                <div>
                  <h4 className="text-[#0d1b10] font-bold text-lg">
                    Sarah Jenkins
                  </h4>
                  <p className="text-primary text-sm font-medium">
                    Founder & Master Blender
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Fav: Earl Grey Supreme
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div
                  className="w-full aspect-[3/4] rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBY4SUeBpzA0TVZwAoPwJv3DJe4t_wA32OMwWBiytNzoU6iV4U9KW6_28TQ92aUvUkz2bLzo5-JaFdd09YBRinC4TS-NO3GVfCa3MOe2iL6FcpVN_cQfcp6NMHZvcvruFRpQf_wlu-pPGD5CpEKt-FZKQjVkxuujxIREzv4zn_tKSD1Au8K-VccPsnei8h6I56h1hdfT7OWBJmUytF8Gyhd12T1U-se_2NjbUXcMtu2a7IAVY8qvlIb8q1P4bLRDhrtpIbgA-Ojwawj")',
                  }}
                ></div>
                <div>
                  <h4 className="text-[#0d1b10] font-bold text-lg">
                    Marcus Chen
                  </h4>
                  <p className="text-primary text-sm font-medium">
                    Head of Sourcing
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Fav: Silver Needle White
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div
                  className="w-full aspect-[3/4] rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmWjbKIKMdbhvbXKvw2wBY_fqs9xtN1flBpyfaWwiY_gbRbk-KRMpR3PXTXHo65UDi0AQI_cLXbnpDmW9f95TDi0Oko10Wri_JGTGcOGFZr2KsV_DrNX8VP6KV5OxJoS9U6jd89VbDx56KkpoYOO0CYxkcRV1B6ygUm6mIhV3WU1-1sDfIUvJ1QjAptmzBVPPGii0QLivZqlO0AG-SjCUPi4QCfDTQ-hbzUBY7oBvFE2b-8-P4QU_26GJ0Z5ddSj8e5DYhnBihxHMh")',
                  }}
                ></div>
                <div>
                  <h4 className="text-[#0d1b10] font-bold text-lg">
                    Elena Rodriguez
                  </h4>
                  <p className="text-primary text-sm font-medium">
                    Sustainability Lead
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Fav: Matcha Ceremonial
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div
                  className="w-full aspect-[3/4] rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_oFmAmj0WFigVLBDtnnnYjJqfEBK28E-m09lz_4l1fDn7uC4-0w01EDkI6M5NwKxRgm_6J5XMtWOmHVnl762ygdxHYNTgOHGsHcsvpY2XbJR_E1xYORpqWjj4o_Hqdh3pVVMD60dYKFVfI5nafvIt4Tyzevwtb716b67_JfQTfdYQEkOXDzpSvGYEnn8na4vXGfHU4iyGy7Jweo83LmYMm6eNVg57mVTyHiOlC_ppJboDAlXTud4FoZsf1JhHYGkTxhUSxPrluaG9")',
                  }}
                ></div>
                <div>
                  <h4 className="text-[#0d1b10] font-bold text-lg">
                    David Okonjo
                  </h4>
                  <p className="text-primary text-sm font-medium">Operations</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Fav: Rooibos Chai
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-surface-light border border-gray-100 p-8 md:p-16 text-center flex flex-col items-center gap-6 shadow-sm">
            <span className="material-symbols-outlined text-primary text-5xl">
              local_cafe
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0d1b10]">
              Ready to taste the difference?
            </h2>
            <p className="text-gray-600 font-medium max-w-lg">
              Join our community of tea lovers and get 15% off your first order
              of sustainable, organic tea.
            </p>
            <div className="flex w-full max-w-md gap-3 mt-4">
              <input
                className="flex-1 rounded-xl border-none focus:ring-2 focus:ring-primary h-14 px-5 bg-white shadow-sm text-[#0d1b10] font-medium"
                placeholder="Enter your email"
                type="email"
              />
              <button className="bg-primary text-[#0d1b10] font-black px-8 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20">
                Join
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
