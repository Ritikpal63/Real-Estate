import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axiosInstance from "../utils/axiosConfig";
import ServiceCard from "./ServiceCard";

const HomeServiceCard = () => {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const getServices = async () => {
    try {
      const res = await axiosInstance.get("/services?limit=4");

      setServices(res.data.data);
    } catch (error) {
      console.log("Service Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Services...</div>;
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
        {/* Heading */}

        <div
          className="
          text-center
          mb-10
          "
        >
          <h2
            className="
            text-3xl
            font-bold
            text-gray-800
            "
          >
            Our Services
          </h2>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Explore our professional services
          </p>
        </div>

        {/* Cards */}

        <ServiceCard services={services} />

        {/* View All Button */}

        <div
          className="
          text-center
          mt-10
          "
        >
          <Link
            to="/services"
            className="
            inline-block
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
            hover:bg-blue-700
            transition
            "
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeServiceCard;
