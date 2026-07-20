import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";

const TeamMember = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/team");
      const resData = res.data;
      if (res.data.success) {
        setTeam(res.data.data);
      } else {
        setError(res.data.message || "Failed to fetch team");
      }

      console.log("Team: ", team);
      console.log("Team Data: ", resData);
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
    <div>
      {team?.map((item) => {
        return <div key={item.id}>
            <h4>{item.name}</h4>
        </div>;
      })}
    </div>
  );
};

export default TeamMember;
