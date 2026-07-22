import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
// import { Link } from "react-router-dom";
const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/team", {
        params: { limit: 4, offset: 0 },
      });
      if (res.data.success) {
        setTeam(res.data.data);
      } else {
        setError(res.data.message || "Failed to fetch team");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Cannot connect to server. Please check if backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const teamMember = [
    {
      id: 1,
      name: "Rahul Sharma",
      designation: "Founder & CEO",
      pic: "/assets/img/team/team-1.jpg",
    },
    {
      id: 2,
      name: "Priya Patel",
      designation: "Head of Operations",
      pic: "/assets/img/team/team-2.jpg",
    },
    {
      id: 3,
      name: "Amit Singh",
      designation: "Real Estate Consultant",
      pic: "/assets/img/team/team-3.jpg",
    },
    {
      id: 4,
      name: "Neha Gupta",
      designation: "Marketing Director",
      pic: "/assets/img/team/team-4.jpg",
    },
  ];
  const displayedTeam = team && team.length > 0 ? team : teamMember;
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <section id="team" className="bg-[#e0eff4] py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Professional Team
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center sm:gap-6 md:grid-cols-4">
            {displayedTeam?.map((item) => {
              console.log("Pic: ", item.pic)
              return <div
                key={item.id}
                className="overflow-hidden rounded-lg bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <img
                  src="/assets/img/team/team-3.jpg"
                  alt={item.name}
                  className="h-40 w-full rounded-md object-cover"
                />

                <h3 className="mt-4 text-base font-semibold sm:text-lg">
                  {item.name}
                </h3>

                <p className="mb-4 text-sm text-gray-500">{item.designation}</p>

                <div className="mx-auto h-1 w-12 rounded bg-green-600"></div>

                <div className="mt-4 flex justify-center gap-2">
                  <a
                    href={item.facebook || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-blue-600 hover:text-white"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>

                  <a
                    href={item.instagram || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-pink-600 hover:text-white"
                  >
                    <i className="fa fa-instagram"></i>
                  </a>

                  <a
                    href={item.twitter || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-sky-500 hover:text-white"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </div>
              </div>;
            })}
          </div>
        </div>
      </section>

      {/* <section id="team" className="py-16 sm:py-20 bg-[#e0eff4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Professional Team
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-6 text-center ">
            {displayedTeam?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border-b-4 border-green-600 shadow-lg p-4"
              >
                <img
                  src="/assets/img/team/team-4.jpg"
                  alt={`${item.name} profile`}
                  className="sm:h-40 object-cover rounded-md img-fluid"
                />

                <h3 className="text-base sm:text-lg font-semibold mt-3">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{item.designation}</p>
                <ul className="flex justify-center gap-2">
                  <li>
                    <Link
                      to={item.facebook || "#"}
                      target="_blank"
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 transition-colors"
                    >
                      <i className="fa fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={item.instagram || "#"}
                      target="_blank"
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-pink-600 hover:text-white transition-colors"
                    >
                      <i className="fa fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={item.twitter || "#"}
                      target="_blank"
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 transition-colors"
                    >
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Team;
