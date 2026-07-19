import { useState, useEffect } from "react";
import "./ContactPopup.css";
import axiosInstance from "../utils/axiosConfig";
import { ToastContainer, toast } from "react-toastify";

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const alreadyShown = localStorage.getItem("contactPopupShown");
    if (!alreadyShown) {
      setIsOpen(true);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem("contactPopupShown", "true"); // ab dobara reload pe nahi dikhega
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.post("/contact", formData);
    setMsg(res.data.data.message);
    console.log("Form submitted:", formData);
    closePopup();
    toast("Message Successfull");
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={closePopup}>
        <ToastContainer />
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={closePopup}>
          ✕
        </button>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
