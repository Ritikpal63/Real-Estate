import React from 'react'

const Search = () => {
  return (
<div className="search_bar section-padding py-12 md:py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {/* Location */}
        <div className="single_search">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 hover:bg-white transition-colors duration-300">
            <option value="1">All Locations</option>
            <option value="2">United States</option>
            <option value="3">United Kingdom</option>
            <option value="4">Afghanistan</option>
            <option value="5">Albania</option>
            <option value="6">Australia</option>
            <option value="7">Benin</option>
            <option value="8">Belgium</option>
          </select>
        </div>

        {/* Category */}
        <div className="single_search">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 hover:bg-white transition-colors duration-300">
            <option value="1">All Categories</option>
            <option value="2">Residential</option>
            <option value="3">Commercial</option>
            <option value="4">Industrial</option>
            <option value="5">Land</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="single_search">
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 hover:bg-white transition-colors duration-300">
            <option value="1">All Types</option>
            <option value="2">Residential</option>
            <option value="3">Commercial</option>
            <option value="4">Land</option>
          </select>
        </div>

        {/* Property Status */}
        <div className="single_search">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 hover:bg-white transition-colors duration-300">
            <option value="1">All Status</option>
            <option value="2">For Sale</option>
            <option value="3">For Rent</option>
            <option value="4">Sold</option>
          </select>
        </div>

        {/* Price */}
        <div className="single_search">
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 hover:bg-white transition-colors duration-300">
            <option value="1">Any Price</option>
            <option value="2">$15,000</option>
            <option value="3">$20,000</option>
            <option value="4">$25,000</option>
            <option value="5">$30,000</option>
            <option value="6">$35,000+</option>
          </select>
        </div>

        {/* Area */}
        <div className="single_search">
          <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft)</label>
          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 hover:bg-white transition-colors duration-300">
            <option value="1">Any Area</option>
            <option value="2">50</option>
            <option value="3">150</option>
            <option value="4">250</option>
            <option value="5">350</option>
            <option value="6">450+</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="single_search">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 hover:bg-white transition-colors duration-300">
            <option value="1">Any</option>
            <option value="2">1</option>
            <option value="3">2</option>
            <option value="4">3</option>
            <option value="5">4</option>
            <option value="6">5</option>
            <option value="7">6</option>
            <option value="8">7+</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div className="single_search">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 hover:bg-white transition-colors duration-300">
            <option value="1">Any</option>
            <option value="2">1</option>
            <option value="3">2</option>
            <option value="4">3</option>
            <option value="5">4+</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="text-center mt-6 md:mt-8">
        <Link
          to="/property"
          className="inline-flex items-center px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base md:text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search Properties
        </Link>
      </div>
    </div>
  </div>
</div>
  )
}

export default Search