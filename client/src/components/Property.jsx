import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const FALLBACK_IMG = "/assets/img/property/1.jpg";

const Property = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosInstance.get("/property", {
          params: { limit: 6, page: 1 },
        });
        setProperties(res.data.data);
      } catch (err) {
        console.error("Property fetch error:", err);
        setProperties([]);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="template_property">
      <div className="container">
        <div className="row">
          {properties?.map((p) => (
            <div
              className="col-md-4 col-sm-12 col-xs-12 hover:cursor-pointer"
              key={p.id}
              onClick={() => (window.location.href = `/property/${p.id}`)}
            >
              <div className="single_property rounded-[30px] overflow-hidden">
                {/* Fixed Image Container */}
                <div className="w-full h-[250px] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-auto h-full object-cover object-center"
                  />
                </div>

                <div className="single_property_content">
                  <h4>
                    <Link to={`/property/${p.id}`}>{p.title}</Link>
                  </h4>

                  <p>{p.location}</p>
                </div>

                <div className="single_property_price">
                  {p.location}
                  <span>${Number(p.price || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Property;
