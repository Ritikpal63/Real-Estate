import React, {useState, useEffect} from "react";
import axiosInstance from "../utils/axiosConfig";
import { Link } from "react-router-dom";
const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/team", {params:{limit:4, offset:0}});
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
    getNews();
  }, []);

  const teamMember = [
    {
      id: 1,
      name: "Rahul Sharma",
      designation: "Founder & CEO",
      image: "assets/img/team/team-1.jpg",
    },
    {
      id: 2,
      name: "Priya Patel",
      designation: "Head of Operations",
      image: "assets/img/team/team-2.jpg",
    },
    {
      id: 3,
      name: "Amit Singh",
      designation: "Real Estate Consultant",
      image: "assets/img/team/team-3.jpg",
    },
    {
      id: 4,
      name: "Neha Gupta",
      designation: "Marketing Director",
      image: "assets/img/team/team-4.jpg",
    },
  ];
    const displayedTeam = team && team.length > 0 ? team : teamMember;
  if (loading) return <p>Loadaing...</p>;
  return (
    <>
      <section id="team" className="py-16 sm:py-20 bg-[#e0eff4]">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl font-bold">Professional Team</h2>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
      {displayedTeam?.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg border-b-4 border-green-600 shadow-[10px_15px_18px_rgba(23,23,36,0.03)] p-4"
        >
          <img
            src="assets/img/team/team-2.jpg"
            alt={item.name}
            className="w-full h-32 sm:h-40 object-cover rounded-md"
          />
          <h3 className="text-base sm:text-lg font-semibold mt-3">{item.name}</h3>
          <p className="text-sm text-gray-500 mb-3">{item.designation}</p>
          <ul className="flex justify-center gap-2">
            <li>
              <Link
                to={item.facebook || "#"}
                target="_blank"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors"
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
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white transition-colors"
              >
                <i className="fa fa-twitter"></i>
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>
    </>
  );
};

export default Team;
