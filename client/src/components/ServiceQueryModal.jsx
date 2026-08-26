import React, { useEffect, useState } from "react";

import axiosInstance from "../utils/axiosConfig";

const ServiceQueryModal = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.contact.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill all fields");

      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axiosInstance.post("/services/query", {
        serviceId: service.id,

        name: formData.name.trim(),

        email: formData.email.trim().toLowerCase(),

        contact: formData.contact.trim(),

        message: formData.message.trim(),
      });

      if (response.data.success) {
        setSuccess(response.data.message);

        setFormData({
          name: "",
          email: "",
          contact: "",
          message: "",
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Unable to send enquiry");
    } finally {
      setLoading(false);
    }
  };

  if (!service) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        bg-black/60
        flex
        items-center
        justify-center
        p-4
      "
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-query-title"
    >
      <div
        className="
          bg-white
          w-full
          max-w-xl
          rounded-2xl
          shadow-2xl
          p-6
          relative
          max-h-[90vh]
          overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-5
            top-4
            text-2xl
            text-gray-500
            hover:text-black
          "
          aria-label="Close enquiry form"
        >
          ×
        </button>

        <h2
          id="service-query-title"
          className="
            text-2xl
            font-bold
            text-gray-800
            mb-2
          "
        >
          Service Enquiry
        </h2>

        <p
          className="
            text-blue-600
            font-semibold
            mb-6
          "
        >
          {service.title}
        </p>

        {error && (
          <div
            className="
              mb-4
              p-3
              rounded-lg
              bg-red-100
              text-red-700
            "
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="
              mb-4
              p-3
              rounded-lg
              bg-green-100
              text-green-700
            "
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="
                block
                mb-2
                font-medium
                text-gray-700
              "
            >
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                p-3
                outline-none
                focus:border-blue-500
              "
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="
                block
                mb-2
                font-medium
                text-gray-700
              "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                p-3
                outline-none
                focus:border-blue-500
              "
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="
                block
                mb-2
                font-medium
                text-gray-700
              "
            >
              Contact
            </label>

            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[^0-9+()\-\s]/g, "")
                  .slice(0, 20);

                setFormData((prev) => ({
                  ...prev,
                  contact: value,
                }));

                setError("");
              }}
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                p-3
                outline-none
                focus:border-blue-500
              "
              placeholder="Enter contact number"
              maxLength={20}
              inputMode="tel"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="
                block
                mb-2
                font-medium
                text-gray-700
              "
            >
              Your Message
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                p-3
                outline-none
                focus:border-blue-500
                resize-none
              "
              placeholder={`Tell us what you need regarding ${service.title}`}
              required
            />
          </div>

          <div
            className="
              flex
              gap-3
              justify-end
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                px-5
                py-3
                border
                rounded-lg
                text-gray-700
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                px-6
                py-3
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-lg
                disabled:opacity-60
              "
            >
              {loading ? "Sending..." : "Send Enquiry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceQueryModal;
