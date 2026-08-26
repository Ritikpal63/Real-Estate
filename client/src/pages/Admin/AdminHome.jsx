import React from "react";
import Section from "../../components/Section";

import AdminAsideSection from "./AdminAsideSection";
import AdminDashboard from "./AdminDashboard";

const AdminHome = () => {
  return (
    <>
      <Section title={"Admin Page"} />
      <div className="flex flex-col lg:flex-row">
        <AdminAsideSection />
        <div className="flex-1 w-full px-4 py-4 lg:px-6">
          <AdminDashboard />
        </div>
      </div>
    </>);

};

export default AdminHome;
