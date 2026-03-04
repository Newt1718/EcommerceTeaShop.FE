import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ProductEdit = () => {
  const location = useLocation();
  const isAddMode = location.pathname.includes('/add');

  return (
    <div className="flex-1 overflow-y-scroll p-4 md:p-8 bg-gray-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {isAddMode ? 'Add New Product' : 'Update Product'}
            </h1>
            <p className="mt-1 text-slate-500">
              {isAddMode ? 'Create a new tea listing and set its comparison metrics.' : 'Edit details, comparison matrix data, and packaging options.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/products" className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              Cancel
            </Link>
            <button 
              onClick={() => alert(isAddMode ? 'Simulating adding new product to Redux store...' : 'Simulating saving edits...')}
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-all transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">{isAddMode ? 'add_circle' : 'save'}</span>
              {isAddMode ? 'Publish Tea' : 'Save Changes'}
            </button>
          </div>
        </div>

        {!isAddMode && (
          <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200">
            <div className="relative flex items-center w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="block w-full h-12 pl-12 pr-4 bg-transparent border-none rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm" 
                placeholder="Search product by name, SKU, or tag to edit..." 
                type="text"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">edit_note</span> General Information
                </h3>
                {!isAddMode && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                    Published
                  </span>
                )}
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="product-name">Product Name</label>
                  <input 
                    className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                    id="product-name" 
                    type="text" 
                    defaultValue={isAddMode ? '' : "Imperial Jasmine Pearl Green Tea"}
                    placeholder={isAddMode ? 'e.g., Spring Harvest Matcha' : ''}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="sku">SKU Tracking</label>
                    <input 
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono uppercase" 
                      id="sku" 
                      type="text" 
                      defaultValue={isAddMode ? '' : "TEA-GRN-JAS-001"}
                      placeholder={isAddMode ? 'TEA-XXX-000' : ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="origin">Sourcing Origin</label>
                    <input 
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                      id="origin" 
                      type="text" 
                      defaultValue={isAddMode ? '' : "Fujian Province, China"}
                      placeholder={isAddMode ? 'e.g., Kyoto, Japan' : ''}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Storefront Description</label>
                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <div className="flex items-center gap-1 p-2 border-b border-slate-200 bg-white">
                      <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded" type="button"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                      <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded" type="button"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
                      <div className="w-px h-4 bg-slate-300 mx-1"></div>
                      <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded" type="button"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
                    </div>
                    <div className="p-3">
                      <textarea 
                        className="w-full border-none bg-transparent p-0 focus:ring-0 text-sm text-slate-800 resize-none outline-none" 
                        rows="4"
                        defaultValue={isAddMode ? '' : "Hand-rolled pearls of premium green tea infused with the delicate scent of night-blooming jasmine flowers. Perfect for relaxing evenings."}
                        placeholder={isAddMode ? 'Describe the flavor profile, history, and feeling of this tea...' : ''}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">tune</span> Tea Comparison Matrix
              </h3>
              <p className="text-xs text-slate-500 mb-6">These core metrics directly power the storefront's algorithm.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Aroma / Smell Profile</label>
                  <select className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    {isAddMode && <option value="" disabled selected>Select profile...</option>}
                    <option>Floral & Sweet</option>
                    <option>Earthy & Woody</option>
                    <option>Roasted & Nutty</option>
                    <option>Fresh & Vegetal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Primary Taste Notes</label>
                  <input 
                    className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                    type="text" 
                    defaultValue={isAddMode ? '' : "Jasmine, Honey, Light Grass"}
                    placeholder={isAddMode ? 'e.g., Umami, Seaweed, Sweet' : ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Brewing Style</label>
                  <select className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    {isAddMode && <option value="" disabled selected>Select style...</option>}
                    <option>Loose Leaf Rolled</option>
                    <option>Loose Leaf Standard</option>
                    <option>Powder / Matcha</option>
                    <option>Compressed Cake</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Credibility Rating (1-5)</label>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                    <input type="range" min="1" max="5" defaultValue={isAddMode ? "3" : "5"} className="w-full accent-blue-600" />
                    <span className="font-bold text-slate-900">{isAddMode ? "3.0" : "5.0"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">imagesmode</span> Product Media
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {!isAddMode && (
                  <div className="relative group aspect-square rounded-lg overflow-hidden border-2 border-blue-600 bg-slate-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400 text-4xl">photo_camera</span>
                    <div className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 rounded">MAIN</div>
                  </div>
                )}
                {!isAddMode && (
                  <div className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-300 text-3xl">image</span>
                  </div>
                )}
                <label className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <span className="material-symbols-outlined text-slate-400 text-3xl mb-1">add_photo_alternate</span>
                  <span className="text-xs text-slate-500 font-bold">Upload</span>
                  <input className="hidden" type="file" />
                </label>
              </div>
            </div>

          </div>

          <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">payments</span> Pricing Engine
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Base Price ($)</label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-slate-500 font-bold sm:text-sm">$</span>
                    </div>
                    <input className="block w-full rounded-lg border-slate-200 bg-slate-50 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono" placeholder="0.00" type="number" defaultValue={isAddMode ? "" : "24.50"} />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-slate-500 font-bold sm:text-sm">USD</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Discount Compare Price</label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-slate-500 font-bold sm:text-sm">$</span>
                    </div>
                    <input className="block w-full rounded-lg border-slate-200 bg-slate-50 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono" placeholder="0.00" type="number" defaultValue={isAddMode ? "" : "28.00"} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">redeem</span> Custom Gifting
              </h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Enable Graphic Packaging</span>
                    <span className="text-xs text-slate-500">Allow users to select pre-designed art wraps for this tea.</span>
                  </div>
                  <button className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAddMode ? 'bg-slate-300' : 'bg-blue-600'}`} type="button">
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAddMode ? 'translate-x-0' : 'translate-x-5'}`}></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">inventory</span> Warehouse Stock
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Initial Quantity</label>
                  <input className="block w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono" type="number" defaultValue={isAddMode ? "0" : "128"} />
                </div>
                {!isAddMode && (
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                      <span>Last Vendor Restock:</span>
                      <span className="text-blue-600">Oct 24, 2023</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;