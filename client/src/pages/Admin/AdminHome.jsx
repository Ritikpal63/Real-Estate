import React from "react";
import Section from "../../components/Section";
import { Link } from "react-router-dom";
import AdminAsideSection from "./AdminAsideSection";

const AdminHome = () => {
  return (
    <>
      <Section title={"Admin Page"} />
      <div className="flex flex-col lg:flex-row">
        <AdminAsideSection />
        <div className="flex-1 w-full px-4 py-4 lg:px-6">
        </div>
      </div>
    </>
  );
};

export default AdminHome;
