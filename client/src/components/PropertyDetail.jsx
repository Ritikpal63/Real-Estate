import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const FALLBACK_IMG = "/assets/img/property/1.jpg";
const getVisitorId = () => {
  let visitorId = localStorage.getItem("visitor_id");

  if (!visitorId) {
    visitorId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    localStorage.setItem("visitor_id", visitorId);
  }
  return visitorId;
};

const PropertyDetail = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);



  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosInstance.get(`/property/${id}`);
        setProperty(res.data);
        console.log("Property Detail Page", res.data)
        const visitorId = getVisitorId();
        await axiosInstance.post(`/property/${id}/view`, {
          visitorId,
        });
      } catch (err) {
        console.error("PropertyDetail fetch error:", err);
        setError(
          err.response?.status === 404
            ? "This property could not be found."
            : "Something went wrong while loading this property."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    try {
      setSending(true);
      await axiosInstance.post("/contact", {
        name: form.name,
        email: form.email,
        message: `[Enquiry for: ${property?.title}]\nPhone: ${form.phone}\n\n${form.message}`,
      });
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Enquiry submit error:", err);
      alert("Could not send your enquiry. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <section className="property_single_details section-padding">
        <div className="container text-center py-5">
          <p>Loading property details...</p>
        </div>
      </section>
    );
  }

  if (error || !property) {
    return (
      <section className="property_single_details section-padding">
        <div className="container text-center py-5">
          <p>{error || "Property not found."}</p>
          <Link to="/property" className="btn btn-lg btn-contact-bg mt-3">
            Back to Properties
          </Link>
        </div>
      </section>
    );
  }

  const amenitiesList = property.amenities
    ? property.amenities.split(",").map((a) => a.trim()).filter(Boolean)
    : [];

  return (
    <section className="property_single_details section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-sm-9 col-xs-12">
            <div className="property_single_details_slide">
              <img
                src={property.image || FALLBACK_IMG}
                className="img-fluid"
                alt={property.title}
                onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
              />
            </div>

            <div className="property_single_details_price">
              <h1>{property.title}</h1>
              <h4>${Number(property.price || 0).toLocaleString()}</h4>
              <p>{property.location}</p>
              <ul>
                <li><i className="fa fa-check"></i> {property.bedroom ?? 0} bed rooms</li>
                <li><i className="fa fa-check"></i> {property.bathroom ?? 0} bathrooms</li>
                <li><i className="fa fa-check"></i> {property.size ? `${property.size} sq ft` : "—"}</li>
              </ul>
            </div>

            <div className="property_single_details_description">
              <h4>Property description</h4>
              <p>{property.description || "No description provided for this property."}</p>
            </div>

            {amenitiesList.length > 0 && (
              <div className="property_info">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="single_property_list">
                      <h4>Amenities</h4>
                      <ul className="single_property_list_mr">
                        {amenitiesList.map((a, i) => (
                          <li key={i}><i className="fa fa-check"></i> {a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="property_map">
              <h4>on map</h4>
              <div className="map-pro">
                <iframe
                  title="property-location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    property.location || ""
                  )}&output=embed`}
                  width="600"
                  height="450"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-3 col-xs-12">
            <div className="single_property_form">
              <h4>Enquire here</h4>
              {sent ? (
                <p>Thanks! We've received your enquiry and will get back to you soon.</p>
              ) : (
                <form className="form" onSubmit={handleEnquirySubmit}>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <input
                        type="text" name="name" className="form-control"
                        placeholder="Name" value={form.name} onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="email" name="email" className="form-control"
                        placeholder="Email" required value={form.email} onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text" name="phone" className="form-control"
                        placeholder="Phone" value={form.phone} onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-12 mbnone">
                      <textarea
                        rows="6" name="message" className="form-control"
                        placeholder="Your Message" required value={form.message} onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="col-md-12">
                      <div className="actions">
                        <button type="submit" disabled={sending} className="btn btn-lg btn-contact-bg">
                          {sending ? "Sending..." : "Send message"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetail;