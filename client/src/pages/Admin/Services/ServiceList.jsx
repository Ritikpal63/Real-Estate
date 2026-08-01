import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axiosInstance from "../../../utils/axiosConfig";
import { iconMap } from "../../../utils/iconMap";

import Section from "../../../components/Section";
import AdminAsideSection from "../AdminAsideSection";

const ServiceList = () => {
  const [services, setServices] = useState([]);

  const [filteredServices, setFilteredServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchServices = async () => {
    try {
      const res = await axiosInstance.get("/services/all");

      setServices(res.data.data);

      setFilteredServices(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);

    const result = services.filter((service) =>
      service.title.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredServices(result);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/services/${id}`);

      alert("Service deleted successfully");

      fetchServices();
    } catch (error) {
      console.log(error);

      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading Services...
      </div>
    );
  }

  return (
    <>
      <Section title="All Services" />

      <div
        className="
        flex
        flex-col
        lg:flex-row
        "
      >
        <AdminAsideSection />

        <div
          className="
          flex-1
          px-4
          py-6
          "
        >
          <div
            className="
            max-w-7xl
            mx-auto
            "
          >
            {/* Header */}

            <div
              className="
              flex
              flex-col
              md:flex-row
              justify-between
              items-center
              mb-6
              "
            >
              <h1
                className="
                text-3xl
                font-bold
                "
              >
                Services
              </h1>

              <Link
                to="/admin/addservices"
                className="
                mt-4
                md:mt-0
                bg-blue-600
                text-white
                px-5
                py-2
                rounded-lg
                hover:bg-blue-700
                "
              >
                + Add Service
              </Link>
            </div>

            {/* Search */}

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search Service..."
              className="
              w-full
              border
              rounded-lg
              p-3
              mb-6
              "
            />

            {/* Table */}

            <div
              className="
              overflow-x-auto
              bg-white
              rounded-xl
              shadow
              "
            >
              <table
                className="
                w-full
                "
              >
                <thead
                  className="
                  bg-gray-100
                  "
                >
                  <tr>
                    <th className="p-4 text-left">Icon</th>

                    <th className="p-4 text-left">Title</th>

                    <th className="p-4 text-left">Slug</th>

                    <th className="p-4 text-left">Status</th>

                    <th className="p-4 text-left">Order</th>

                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredServices.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="
                        text-center
                        py-10
                        text-gray-500
                        "
                      >
                        No Services Found
                      </td>
                    </tr>
                  ) : (
                    filteredServices.map((service) => {
                      const Icon = iconMap[service.icon];

                      return (
                        <tr
                          key={service.id}
                          className="
                        border-t
                        hover:bg-gray-50
                        "
                        >
                          <td className="p-4">
                            <div
                              className="
                            w-12
                            h-12
                            rounded-full
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            "
                            >
                              {Icon && (
                                <Icon
                                  className="
                              text-blue-600
                              text-xl
                              "
                                />
                              )}
                            </div>
                          </td>

                          <td
                            className="
                          p-4
                          font-medium
                          "
                          >
                            {service.title}
                          </td>

                          <td className="p-4">{service.slug}</td>

                          <td className="p-4">
                            <span
                              className={`
                            px-3
                            py-1
                            rounded-full
                            text-white
                            text-sm

                            ${
                              service.status === "active"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }

                            `}
                            >
                              {service.status}
                            </span>
                          </td>

                          <td className="p-4">{service.display_order}</td>

                          <td className="p-4">
                            <div
                              className="
                            flex
                            justify-center
                            gap-3
                            "
                            >
                              <Link
                                to={`/admin/editservices/${service.id}`}
                                className="
                              bg-primary
                              text-light
                              px-4
                              py-2
                              rounded
                              "
                              >
                                Edit
                              </Link>

                              <button
                                onClick={() => handleDelete(service.id)}
                                className="
                              bg-red-600
                              text-light
                              px-4
                              py-2
                              rounded
                              "
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceList;
