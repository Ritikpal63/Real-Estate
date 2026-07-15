// import PropertyPreview from "../components/PropertyPreview";

import Section from "../../components/Section";
import AdminAsideSection from "./AdminAsideSection";
import AddProperty from "./Property/AddProperty";

export default function AddPropertyPage() {
  return (
    <>
    <Section title={"Add Property"} />
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 w-full col-md-12 py-2">
          <AdminAsideSection />
        </div>
        <div className="col-lg-8 col-md-12  w-full py-2">
          <AddProperty />
        </div>
      </div>
    </div>
    </>
  );
}