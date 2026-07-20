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
      const res = await axiosInstance.get("/team");
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
      <section id="team" className="our_team section-padding">
        <div className="container">
          <div className="section-title text-center wow zoomIn">
            <h2>Professional Team</h2>
          </div>
          <div className="row text-center">
            {displayedTeam?.map((item) => {
              return (
                <div key={item.id} className="col-lg-3 col-sm-3 col-xs-12">
                  <div className="single_team">
                    <img src='assets/img/team/team-2.jpg' className="img-fluid" alt="" />
                    <h3>{item.name}</h3>
                    <p>{item.designation}</p>
                    <ul className="list-inline">
                      <li>
                        <Link to={item.facebook} className="st-facebook" target="_blank">
                          <i className="fa fa-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={item.instagram} className="st-instagram">
                          <i className="fa fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={item.twitter} className="st-twitter">
                          <i className="fa fa-twitter"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
