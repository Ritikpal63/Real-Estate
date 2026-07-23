// import PropertyPreview from "../components/PropertyPreview";

import Section from "../../components/Section";
import AdminAsideSection from "./AdminAsideSection";
import AddProperty from "./Property/AddProperty";

export default function AddPropertyPage() {
  return (
    <>
    <Section title={"Add Property"} />
        <div className="flex flex-col lg:flex-row">
          <AdminAsideSection />
        <div className="flex-1 w-full min-w-0 bg-gray-50">
          <AddProperty />
        </div>
      </div>
    </>
  );
}
