import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../../../components/Section";
import AdminAsideSection from "../AdminAsideSection";
import axiosInstance from "../../../utils/axiosConfig";
import { iconMap, iconOptions } from "../../../utils/iconMap";

const AddService = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "FaBuilding",
    status: "active",
    display_order: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: value.toLowerCase().trim().replace(/\s+/g, "-")
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/services", form);

      alert("Service Added Successfully");

      navigate("/admin/services");
    } catch (err) {
      console.log(err);
      alert("Failed to create service.");
    }
  };

  const SelectedIcon = iconMap[form.icon];

  return (
    <>
      <Section title="Add Service" />

      <div className="flex flex-col lg:flex-row">
        <AdminAsideSection />

        <div className="flex-1 bg-gray-50 min-h-screen">
          <div className="max-w-5xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8">Add New Service</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {}

                  <div>
                    <label className="block font-semibold mb-2">Title</label>

                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      required />

                  </div>

                  {}

                  <div>
                    <label className="block font-semibold mb-2">Slug</label>

                    <input
                      type="text"
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      required />

                  </div>
                </div>

                {}

                <div>
                  <label className="block font-semibold mb-2">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />

                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {}

                  <div>
                    <label className="block font-semibold mb-2">Icon</label>

                    <select
                      name="icon"
                      value={form.icon}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3">

                      {iconOptions.map((item) =>
                      <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      )}
                    </select>

                    {}

                    <div className="mt-4 flex items-center gap-4 border rounded-lg p-4 bg-gray-50">
                      {SelectedIcon &&
                      <SelectedIcon className="text-4xl text-blue-600" />
                      }

                      <div>
                        <p className="font-semibold">{form.icon}</p>

                        <p className="text-sm text-gray-500">Selected Icon</p>
                      </div>
                    </div>
                  </div>

                  {}

                  <div>
                    <label className="block font-semibold mb-2">
                      Display Order
                    </label>

                    <input
                      type="number"
                      name="display_order"
                      value={form.display_order}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3" />

                  </div>
                </div>

                {}

                <div>
                  <label className="block font-semibold mb-2">Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3">

                    <option value="active">Active</option>

                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {}

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition">

                  Create Service
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>);

};

export default AddService;
