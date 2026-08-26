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
        setError("");

        const res = await axiosInstance.get("/team/all");

        const teamData = res.data?.data || [];

        setItems(teamData);
        setFilteredTeam(teamData);
      } catch (err) {
        console.error("Team Fetch Error:", err);

        setError(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);





  const handleSearch = (value) => {
    setSearch(value);

    const searchValue = value.trim().toLowerCase();

    if (!searchValue) {
      setFilteredTeam(items);
      return;
    }

    const result = items.filter(
      (item) =>
      item.name?.toLowerCase().includes(searchValue) ||
      item.designation?.toLowerCase().includes(searchValue)
    );

    setFilteredTeam(result);
  };





  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team member?")) return;

    try {
      await axiosInstance.delete(`/team/${id}`);

      const updatedItems = items.filter((item) => item.id !== id);

      setItems(updatedItems);


      if (search.trim()) {
        const searchValue = search.toLowerCase();

        setFilteredTeam(
          updatedItems.filter(
            (item) =>
            item.name?.toLowerCase().includes(searchValue) ||
            item.designation?.toLowerCase().includes(searchValue)
          )
        );
      } else {
        setFilteredTeam(updatedItems);
      }
    } catch (err) {
      console.error("Delete Error:", err);

      alert(
        err.response?.data?.message ||
        err.message ||
        "Failed to delete team member"
      );
    }
  };

  return (
    <>
      {

      }

      <Section title="All Team Members" />

      <div className="flex flex-col lg:flex-row min-h-screen">
        {

        }

        <AdminAsideSection />

        {

        }

        <div className="flex-1 w-full min-w-0 bg-gray-50">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-4 sm:py-6 lg:py-8">
            {

            }

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
                mb-6
              ">









              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Team Members
                </h2>

                <p className="text-gray-500 text-sm sm:text-base mt-1">
                  Manage team member profiles.
                </p>
              </div>

              <Link
                to="/admin/addteam"
                className="
                  inline-flex
                  items-center
                  justify-center
                  bg-primary
                  hover:bg-primary/90
                  text-white
                  rounded-lg
                  px-4
                  py-2.5
                  text-sm
                  sm:text-base
                  font-medium
                  transition
                  duration-300
                  w-full
                  sm:w-auto
                ">


















                + Add Team Member
              </Link>
            </div>

            {

            }

            {loading &&
            <>
                {}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                  {[1, 2, 3, 4].map((n) =>
                <div
                  key={n}
                  className="
                        bg-white
                        rounded-xl
                        shadow-sm
                        p-4
                        animate-pulse
                      ">







                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-xl" />

                        <div className="flex-1 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 rounded w-1/2" />
                          <div className="h-3 bg-gray-200 rounded w-1/3" />
                        </div>
                      </div>
                    </div>
                )}
                </div>

                {}
                <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-[600px] bg-gray-100 animate-pulse" />
                </div>
              </>
            }

            {

            }

            {!loading && error &&
            <div
              className="
                  bg-red-50
                  border
                  border-red-200
                  text-red-600
                  rounded-xl
                  px-4
                  py-4
                  text-sm
                ">










                {error}
              </div>
            }

            {

            }

            {!loading && !error && items.length === 0 &&
            <div
              className="
                    bg-white
                    rounded-xl
                    shadow-sm
                    px-4
                    py-12
                    text-center
                    text-gray-500
                  ">









                <p className="text-base sm:text-lg">No team members yet.</p>

                <Link
                to="/admin/addteam"
                className="
                      inline-block
                      mt-4
                      bg-primary
                      text-white
                      px-5
                      py-2.5
                      rounded-lg
                      text-sm
                      font-medium
                    ">











                  + Add Team Member
                </Link>
              </div>
            }

            {

            }

            {!loading && !error && items.length > 0 &&
            <>
                {

              }

                <div className="mb-5">
                  <div className="relative">
                    <input
                    type="text"
                    placeholder="Search by name or designation..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="
                          w-full
                          bg-white
                          border
                          border-gray-200
                          rounded-xl
                          px-4
                          py-3
                          text-sm
                          sm:text-base
                          outline-none
                          focus:ring-2
                          focus:ring-primary/30
                          focus:border-primary
                          transition
                        " />

















                    {search &&
                  <button
                    type="button"
                    onClick={() => handleSearch("")}
                    className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                            hover:text-gray-700
                            text-lg
                          ">









                        ×
                      </button>
                  }
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Showing {filteredTeam.length} of {items.length} team members
                  </p>
                </div>

                {

              }

                {filteredTeam.length === 0 &&
              <div
                className="
                        bg-white
                        rounded-xl
                        shadow-sm
                        px-4
                        py-10
                        text-center
                        text-gray-500
                      ">









                    No team member found for{" "}
                    <span className="font-semibold">"{search}"</span>
                  </div>
              }

                {

              }

                {filteredTeam.length > 0 &&
              <div
                className="
                        hidden
                        lg:block
                        bg-white
                        rounded-xl
                        shadow-lg
                        overflow-hidden
                      ">








                    <div className="max-h-[700px] overflow-y-auto adminNews">
                      <table className="w-full">
                        {}

                        <thead className="bg-gray-50 sticky top-0 z-10">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Post
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Designation
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>

                        {}

                        <tbody className="divide-y divide-gray-200">
                          {filteredTeam.map((p) =>
                      <tr
                        key={p.id}
                        className="hover:bg-gray-50 transition">

                              {}

                              <td className="px-6 py-4">
                                <img
                            src={p.image}
                            alt={p.name}
                            className="
                                      w-12
                                      h-12
                                      rounded-lg
                                      object-cover
                                      border
                                      border-gray-200
                                    " />








                              </td>

                              {}

                              <td className="px-6 py-4">
                                <span
                            className="
                                      inline-block
                                      text-xs
                                      font-semibold
                                      text-blue-600
                                      bg-blue-50
                                      px-3
                                      py-1.5
                                      rounded-full
                                      max-w-[180px]
                                      truncate
                                    "











                            title={p.designation}>

                                  {p.designation || "N/A"}
                                </span>
                              </td>

                              {}

                              <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                {p.name || "N/A"}
                              </td>

                              {}

                              <td className="px-6 py-4 text-sm text-green-800">
                                {p.created_at ?
                          new Date(p.created_at).toLocaleDateString() :
                          "N/A"}
                              </td>

                              {}

                              <td className="px-6 py-4">
                                <div className="flex gap-2 justify-center">
                                  <button
                              type="button"
                              onClick={() =>
                              navigate(`/admin/team/${p.id}/edit`)
                              }
                              className="
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                        text-sm
                                        transition
                                      ">










                                    Edit
                                  </button>

                                  <button
                              type="button"
                              onClick={() => handleDelete(p.id)}
                              className="
                                        bg-red-600
                                        hover:bg-red-700
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                        text-sm
                                        transition
                                      ">










                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                      )}
                        </tbody>
                      </table>
                    </div>
                  </div>
              }

                {

              }

                {filteredTeam.length > 0 &&
              <div
                className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        gap-4
                        lg:hidden
                      ">







                    {filteredTeam.map((p) =>
                <div
                  key={p.id}
                  className="
                            bg-white
                            rounded-xl
                            shadow-sm
                            border
                            border-gray-100
                            p-4
                            hover:shadow-md
                            transition
                            duration-300
                          ">











                        {}

                        <div className="flex items-start gap-4">
                          {}

                          <img
                      src={p.image}
                      alt={p.name}
                      className="
                                w-16
                                h-16
                                sm:w-20
                                sm:h-20
                                rounded-xl
                                object-cover
                                flex-shrink-0
                                border
                                border-gray-200
                              " />












                          {}

                          <div className="min-w-0 flex-1">
                            <h3
                        className="
                                  text-base
                                  sm:text-lg
                                  font-semibold
                                  text-gray-800
                                  truncate
                                ">







                              {p.name || "N/A"}
                            </h3>

                            <span
                        className="
                                  inline-block
                                  mt-1
                                  text-xs
                                  sm:text-sm
                                  font-semibold
                                  text-blue-600
                                  bg-blue-50
                                  px-2.5
                                  py-1
                                  rounded-full
                                  max-w-full
                                  truncate
                                "













                        title={p.designation}>

                              {p.designation || "N/A"}
                            </span>

                            <p className="text-xs sm:text-sm text-gray-500 mt-2">
                              {p.created_at ?
                        new Date(p.created_at).toLocaleDateString() :
                        "Date unavailable"}
                            </p>
                          </div>
                        </div>

                        {}

                        <div className="border-t border-gray-100 my-4" />

                        {}

                        <div className="grid grid-cols-2 gap-2">
                          <button
                      type="button"
                      onClick={() => navigate(`/admin/team/${p.id}/edit`)}
                      className="
                                w-full
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-3
                                py-2.5
                                rounded-lg
                                text-sm
                                font-medium
                                transition
                              ">












                            Edit
                          </button>

                          <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="
                                w-full
                                bg-red-600
                                hover:bg-red-700
                                text-white
                                px-3
                                py-2.5
                                rounded-lg
                                text-sm
                                font-medium
                                transition
                              ">












                            Delete
                          </button>
                        </div>
                      </div>
                )}
                  </div>
              }
              </>
            }
          </div>
        </div>
      </div>
    </>);

}
