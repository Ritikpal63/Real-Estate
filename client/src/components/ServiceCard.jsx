import { iconMap } from "../utils/iconMap";

const ServiceCard = ({ services = [] }) => {
  return (
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
        <div className="col-span-full text-center py-10 text-gray-500">
          No Services Available
        </div>
      ) : (
        services.map((service) => {
          const Icon = iconMap[service.icon];

          return (
            <div
              key={service.id}
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
                "
            >
              {/* Icon */}

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

              {/* Title */}

              <h3
                className="
                  text-lg
                  font-semibold
                  text-gray-800
                  "
              >
                {service.title}
              </h3>

              {/* Description */}

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
            </div>
          );
        })
      )}
    </div>
  );
};

export default ServiceCard;
