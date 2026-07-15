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
          <div className="col-lg-4 col-md-12 w-full">
           <AdminAsideSection />
          </div>
          <div className="col-lg-8 col-md-12 w-full"></div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
