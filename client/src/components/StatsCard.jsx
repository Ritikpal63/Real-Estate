import React, { useState } from "react";

import { iconMap } from "../utils/iconMap";

import ServiceQueryModal from "./ServiceQueryModal";

const ServiceCard = ({ services = [] }) => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >
        {services.length === 0 ? (
          <div
            className="
              col-span-full
              text-center
              py-10
              text-gray-500
            "
          >
            No Services Available
          </div>
        ) : (
          services.map((service) => {
            const Icon = iconMap[service.icon];

            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    border
                    border-gray-100
                    p-6
                    text-center
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                    cursor-pointer
                  "
              >
                <div
                  className="
                      w-16
                      h-16
                      mx-auto
                      rounded-full
                      bg-blue-100
                      flex
                      items-center
                      justify-center
                      mb-4
                    "
                >
                  {Icon && (
                    <Icon
                      className="
                          text-3xl
                          text-blue-600
                        "
                    />
                  )}
                </div>

                <h3
                  className="
                      text-lg
                      font-semibold
                      text-gray-800
                    "
                >
                  {service.title}
                </h3>

                {service.description && (
                  <p
                    className="
                        mt-3
                        text-sm
                        text-gray-500
                        line-clamp-3
                      "
                  >
                    {service.description}
                  </p>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    setSelectedService(service);
                  }}
                  className="
                      mt-5
                      px-5
                      py-2.5
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      rounded-lg
                      transition
                    "
                >
                  Enquire Now
                </button>
              </div>
            );
          })
        )}
      </div>

      {selectedService && (
        <ServiceQueryModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
};

export default ServiceCard;
