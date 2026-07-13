import React from 'react'

const Search = () => {
  return (
    <div>
        <div className="search_bar section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_search">
                <select>
                  <option value="1">Location</option>
                  <option value="2">United States</option>
                  <option value="3">United Kingdom</option>
                  <option value="3">Afghanistan</option>
                  <option value="3">Albania</option>
                  <option value="3">Australia</option>
                  <option value="3">Benin</option>
                  <option value="3">Belgium</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_search">
                <select>
                  <option value="1">Category</option>
                  <option value="1">Category</option>
                  <option value="1">Category</option>
                  <option value="1">Category</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_search">
                <select>
                  <option value="1">Property Type</option>
                  <option value="1">Residential</option>
                  <option value="1">Commercial</option>
                  <option value="1">Land</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_search">
                <select>
                  <option value="1">Property Status</option>
                  <option value="1">For Sale</option>
                  <option value="1">For Rent</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_search">
                <select>
                  <option value="1">Price</option>
                  <option value="1">$15000</option>
                  <option value="1">$20000</option>
                  <option value="1">$25000</option>
                  <option value="1">$30000</option>
                  <option value="1">$35000</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_search">
                <select>
                  <option value="1">Area</option>
                  <option value="1">50</option>
                  <option value="1">150</option>
                  <option value="1">250</option>
                  <option value="1">350</option>
                  <option value="1">450</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_search">
                <select>
                  <option value="1">BedRooms</option>
                  <option value="1">1</option>
                  <option value="1">2</option>
                  <option value="1">3</option>
                  <option value="1">4</option>
                  <option value="1">5</option>
                  <option value="1">6</option>
                  <option value="1">7</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="single_search">
                <select>
                  <option value="1">Bathrooms</option>
                  <option value="1">1</option>
                  <option value="1">2</option>
                  <option value="1">3</option>
                  <option value="1">4</option>
                </select>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <div className="search_btn">
                <a href="#" className="btn btn-serach-bg">
                  search
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search