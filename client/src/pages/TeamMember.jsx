import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
import Section from "../components/Section";
import AdminAsideSection from "./Admin/AdminAsideSection";



const TeamMember = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/team/all");
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
  return (
    <>
      <Section title={"All Team"} />
          <div className="flex flex-col lg:flex-row">
            <AdminAsideSection />
          <div className="flex-1 w-full min-w-0 bg-gray-50">
            <div className="container-fluid">
              <h1>All Team</h1>
              {team?.map((item) => {
                return <div key={item.id}>{item.name}</div>;
              })}
            </div>
        </div>
      </div>
    </>
  );
};

export default TeamMember;
