import { useEffect, useState } from "react";

import axiosInstance from "../../utils/axiosConfig";

import StatsCard from "../../components/StatsCard";

import { FaBuilding, FaUsers, FaEnvelope, FaImages } from "react-icons/fa";

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  const getDashboardData = async () => {
    try {
      const res = await axiosInstance.get("/admin/dashboard");

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (!data) {
    return <h2>Loading Dashboard...</h2>;
  }

  const stats = data.stats;

  return (
    <div>
      <h1
        className="
text-3xl
font-bold
mb-6
"
      >
        Dashboard Overview
      </h1>

      <div
        className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
gap-5
"
      >
        <StatsCard
          title="Properties"
          value={stats.totalProperties}
          icon={<FaBuilding />}
        />

        <StatsCard title="Users" value={stats.totalUsers} icon={<FaUsers />} />

        <StatsCard
          title="Services"
          value={stats.totalServices}
          icon={<FaImages />}
        />

        <StatsCard
          title="Leads"
          value={stats.totalLeads}
          icon={<FaEnvelope />}
        />
      </div>

      <div
        className="
bg-white
mt-8
rounded-xl
shadow
p-5
"
      >
        <h2
          className="
text-xl
font-bold
mb-4
"
        >
          Recent Properties
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="
          bg-gray-50
          text-gray-600
          text-sm
          uppercase
          tracking-wider
          "
              >
                <th className="px-6 py-4 text-left">Title</th>

                <th className="px-6 py-4 text-left">Price</th>

                <th className="px-6 py-4 text-left">Location</th>

                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data.recentProperties.map((property) => (
                <tr
                  key={property.id}
                  className="
            hover:bg-blue-50
            transition
            duration-200
            "
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                  w-12
                  h-12
                  rounded-lg
                  bg-blue-100
                  flex
                  items-center
                  justify-center
                  text-blue-600
                  font-bold
                  "
                      >
                        {property.title?.charAt(0)}
                      </div>

                      <div>
                        <p
                          className="
                  font-semibold
                  text-gray-800
                  "
                        >
                          {property.title}
                        </p>

                        <p
                          className="
                  text-sm
                  text-gray-500
                  "
                        >
                          ID: {property.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className="
                bg-green-100
                text-green-700
                px-3
                py-1
                rounded-full
                font-semibold
                text-sm
                "
                    >
                      ₹ {property.price}
                    </span>
                  </td>

                  <td
                    className="
            px-6
            py-4
            text-gray-600
            "
                  >
                    {property.location}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className="
                bg-blue-100
                text-blue-700
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                "
                    >
                      Available
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
