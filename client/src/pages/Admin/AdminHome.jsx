import React from "react";
import Section from "../../components/Section";
import { Link } from "react-router-dom";
import AdminAsideSection from "./AdminAsideSection";

const AdminHome = () => {
  return (
    <>
      <Section title={"Admin Page"} />
      <div className="container-fluid">
        <div className="row m-2">
         <div className="flex flex-col lg:flex-row">
  <AdminAsideSection />
  <div className="flex-1 w-full px-4 py-4 lg:px-6">
    {/* baaki content yahan */}
  </div>
</div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
