import { useEffect, useState } from "react";

import axiosInstance from "../utils/axiosConfig";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const getAllServices = async () => {
    try {
      const res = await axiosInstance.get("/services/all");

      setServices(res.data.data);
    } catch (err) {
      console.log(err);

      setError("Unable to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  if (loading) {
    return (
      <div
        className="
        text-center
        py-20
        text-xl
        font-semibold
        "
      >
        Loading Services...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
        text-center
        py-20
        text-red-500
        "
      >
        {error}
      </div>
    );
  }

  return (
    <section
      className="
      w-full
      py-12
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        "
      >
        {/* Page Heading */}

        <div
          className="
          text-center
          mb-10
          "
        >
          <h1
            className="
            text-4xl
            font-bold
            text-gray-800
            "
          >
            All Services
          </h1>

          <p
            className="
            text-gray-500
            mt-3
            "
          >
            Explore all our available services
          </p>
        </div>

        {/* Services */}

        <ServiceCard services={services} />
      </div>
    </section>
  );
};

export default Services;
