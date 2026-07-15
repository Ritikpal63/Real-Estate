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
        <div className="col-4 w-full h-[500px] py-2">
          <AdminAsideSection />
        </div>
        <div className="col-8  w-full py-2">
          <AddProperty />
        </div>
      </div>
    </div>
    </>
  );
}