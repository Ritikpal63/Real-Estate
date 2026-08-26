import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";

const PORTFOLIO_DATA = [
{
  id: 1,
  image: "/assets/img/portfolio/1.jpg",
  title: "Your Dream House",
  tags: ["bathroom", "kitchen", "garage"]
},
{
  id: 2,
  image: "/assets/img/portfolio/2.jpg",
  title: "Luxury Bedroom",
  tags: ["bedroom", "garage"]
},
{
  id: 3,
  image: "/assets/img/portfolio/3.jpg",
  title: "Modern Bathroom",
  tags: ["bathroom"]
},
{
  id: 4,
  image: "/assets/img/portfolio/4.jpg",
  title: "Modern Kitchen",
  tags: ["kitchen", "garage"]
},
{
  id: 5,
  image: "/assets/img/portfolio/5.jpg",
  title: "Bedroom Interior",
  tags: ["bedroom"]
},
{
  id: 6,
  image: "/assets/img/portfolio/6.jpg",
  title: "Kitchen Design",
  tags: ["bathroom", "kitchen"]
},
{
  id: 7,
  image: "/assets/img/portfolio/7.jpg",
  title: "Basement",
  tags: ["basement", "garage"]
},
{
  id: 8,
  image: "/assets/img/portfolio/8.jpg",
  title: "Luxury Basement",
  tags: ["bedroom", "basement"]
},
{
  id: 9,
  image: "/assets/img/portfolio/9.jpg",
  title: "Modern Home",
  tags: ["bedroom", "basement"]
}];


const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filterCategories = [
  "all",
  "bedroom",
  "bathroom",
  "kitchen",
  "garage",
  "basement"];


  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get("/gallery");

        const data = res.data?.data || res.data || [];

        setGalleryItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load gallery.");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const galleryData = galleryItems.length > 0 ? galleryItems : PORTFOLIO_DATA;

  const filteredItems =
  activeFilter === "all" ?
  galleryData :
  galleryData.filter((item) => {
    const tags = Array.isArray(item.tags) ?
    item.tags :
    item.category ?
    [item.category] :
    [];

    return tags.includes(activeFilter);
  });

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading Gallery...</h4>
      </div>);

  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h5>{error}</h5>
      </div>);

  }

  return (
    <section id="gallery" className="works_area py-5">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2>Gallery</h2>
          <div></div>
        </div>

        <div className="text-center mb-4">
          <ul className="portfolio-filters list-inline">
            {filterCategories.map((category) =>
            <li
              key={category}
              className={`list-inline-item px-3 py-2 ${
              activeFilter === category ? "active" : ""}`
              }
              style={{
                cursor: "pointer",
                fontWeight: activeFilter === category ? "bold" : "normal"
              }}
              onClick={() => setActiveFilter(category)}>

                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            )}
          </ul>
        </div>

        <div className="row">
          {filteredItems.length > 0 ?
          filteredItems.map((item) => {
            const image = item.image?.startsWith("http") ?
            item.image :
            item.image;

            return (
              <div
                key={item.id}
                className="col-lg-4 col-md-6 col-sm-12 mb-4">

                  <div className="grid shadow-sm">
                    <figure className="effect-apollo">
                      <img
                      src={image}
                      alt={item.title}
                      className="img-fluid w-100"
                      style={{
                        height: "300px",
                        objectFit: "cover"
                      }} />


                      <figcaption>
                        <a
                        className="prettyPhoto image_zoom"
                        href={item.image}>
                      </a>
                        <p>
                          <a
                          href="#"
                          data-toggle="modal"
                          data-target="#projectModal">

                            {item.title}
                          </a>
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                </div>);

          }) :

          <div className="col-12 text-center">
              <h5>No Gallery Found</h5>
            </div>
          }
        </div>
      </div>
    </section>);

};

export default GalleryPage;
