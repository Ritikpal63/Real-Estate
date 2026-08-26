import React, { useState, useEffect } from 'react';
import axiosInstance from "../utils/axiosConfig";

const PORTFOLIO_DATA = [
{ id: 1, image: "/assets/img/portfolio/1.jpg", title: "Your Dream House", tags: ["bathroom", "kitchen", "garage"] },
{ id: 2, image: "/assets/img/portfolio/2.jpg", title: "Your Dream House", tags: ["bedroom", "garage"] },
{ id: 3, image: "/assets/img/portfolio/3.jpg", title: "Your Dream House", tags: ["bathroom"] },
{ id: 4, image: "/assets/img/portfolio/4.jpg", title: "Your Dream House", tags: ["garage", "kitchen"] },
{ id: 5, image: "/assets/img/portfolio/5.jpg", title: "Your Dream House", tags: ["bedroom"] },
{ id: 6, image: "/assets/img/portfolio/6.jpg", title: "Your Dream House", tags: ["bathroom", "kitchen"] },
{ id: 7, image: "/assets/img/portfolio/7.jpg", title: "Your Dream House", tags: ["basement", "garage"] },
{ id: 8, image: "/assets/img/portfolio/8.jpg", title: "Your Dream House", tags: ["bedroom", "basement"] },
{ id: 9, image: "/assets/img/portfolio/9.jpg", title: "Your Dream House", tags: ["bedroom", "basement"] }];


const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getAllGallery = async () => {
      try {
        const response = await axiosInstance.get('/gallery');

        const items = response?.data?.data ?? response?.data ?? [];
        if (mounted) setGalleryItems(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error('Error fetching gallery:', error);

      }
    };

    getAllGallery();

    return () => {mounted = false;};
  }, []);

  const dataSource = galleryItems.length ? galleryItems : PORTFOLIO_DATA;

  const filterCategories = ['all', 'bedroom', 'bathroom', 'kitchen', 'garage', 'basement'];

  const filteredItems = activeFilter === 'all' ?
  dataSource :
  dataSource.filter((item) => {
    const tags = item.tags || item.tag || [];
    return Array.isArray(tags) ? tags.includes(activeFilter) : false;
  });

  return (
    <>
      <section id="gallery" className="works_area">
        <div className="container">
          <div className="section-title text-center wow zoomIn">
            <h2>Gallery</h2>
            <div></div>
          </div>

          <div className="col-lg-12 text-center">
            <ul className="portfolio-filters">
              {filterCategories.map((category) =>
              <li
                key={category}
                className={`filter ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
                style={{ cursor: 'pointer' }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </li>
              )}
            </ul>
          </div>

          <div className="row portfolio-items-list">
            {filteredItems.map((item) =>
            <div key={item.id} className="col-lg-4 col-sm-4 col-xs-12">
                <div className="grid">
                  <figure className="effect-apollo">
                    <img src={item.image} className="img-fluid" alt={item.title} />
                    <figcaption>
                      <a className="prettyPhoto image_zoom" href={item.image}></a>
                      <p>
                        <a href="#" data-toggle="modal" data-target="#projectModal">
                          {item.title}
                        </a>
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </>);

};

export default Gallery;
