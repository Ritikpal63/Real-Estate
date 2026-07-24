import React from "react";
import Section from "../../../components/Section";
import AdminAsideSection from "../AdminAsideSection";

const AdminViewProperty = () => {
  const [property, setProperty] = useState([]);
  const getproperty = async () => {
    try {
      const res = await axiosInstance.get("/property");
      setProperty(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getproperty();
  }, []);

  return (
    <>
      <Section title={"View Property"} />
      <div className="flex flex-col lg:flex-row">
        <AdminAsideSection />
        <div className="flex-1 w-full min-w-0 bg-gray-50">
            {property.map((item)=>{
                return <div key={item.id}>
                    {item.title}
                </div>
            })}
        </div>
      </div>
    </>
  );
};

export default AdminViewProperty;
