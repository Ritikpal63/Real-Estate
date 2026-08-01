import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ServiceForm from "../../../components/ServiceFrom";
import { getService, updateService } from "../../../services/serviceApi";
import axiosInstance from "../../../utils/axiosConfig";

const EditService = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "FaBuilding",
    image: "",
    status: "active",
    display_order: 0,
  });

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const res = await axiosInstance.get(`/services/${id}`);

      setForm(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/services/${id}`, form);

      alert("Service Updated Successfully");

      navigate("/admin/services");
    } catch (err) {
      console.log(err);

      alert("Update Failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Service</h1>

      <ServiceForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Update Service"
      />
    </div>
  );
};

export default EditService;
