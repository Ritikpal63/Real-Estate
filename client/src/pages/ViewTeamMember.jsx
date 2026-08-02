import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import Section from "../components/Section";
import AdminAsideSection from "../pages/Admin/AdminAsideSection";

export default function ViewTeamMember() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/team/all");
        setItems(res.data.data);
        setFilteredTeam(res.data.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMembers();
  }, []);
  const handleSearch = (value) => {
    setSearch(value);
    if (!value.trim()) {
      setFilteredTeam(items);
      return;
    }
    const result = items.filter((item) =>
      item.name?.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredTeam(result);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team member?")) return;
    try {
      await axiosInstance.delete(`/team/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <Section title={"All Team Members"} />
      <div className="flex flex-col lg:flex-row">
        <AdminAsideSection />
        <div className="flex-1 w-full min-w-0 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Team Members</h2>
                <p className="text-gray-500 mt-1">
                  Manage team member profiles.
                </p>
              </div>
              <Link to="/admin/addteam">
                <span className="bg-primary text-white rounded-lg px-4 py-3 text-md">
                  + Add Team Member
                </span>
              </Link>
            </div>

            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="bg-gray-100 rounded-2xl h-48 animate-pulse"
                  />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="bg-gray-50 rounded-xl px-4 py-10 text-center text-gray-500">
                No team members yet. Click "+ Add Team Member" to add one.
              </div>
            )}

            {!loading && !error && items.length > 0 && (<>
              <input
                type="text"
                placeholder="Search Name..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full border rounded-lg p-2 mb-4"
              />
              <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-[750px] overflow-y-auto adminNews">
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Post
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Designation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredTeam.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 max-w-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-10 h-10 rounded-lg object-cover shrink-0"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                              {p.designation}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {p.name || 0}
                          </td>
                          <td className="px-6 py-4 text-sm text-green-800">
                            {new Date(p.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-3 justify-around">
                              <button
                                onClick={() => navigate(`/admin/team/${p.id}/edit`)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(p.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}