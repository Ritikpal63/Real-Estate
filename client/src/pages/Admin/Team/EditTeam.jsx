import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Section from "../../../components/Section";
import AdminAsideSection from "../AdminAsideSection";
import ImageUploader from "../Property/ImageUploader";
import axiosInstance from "../../../utils/axiosConfig";

export default function EditTeam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    designation: "",
    email: "",
    phone: "",
    facebook: "",
    instagram: "",
    twitter: "",
    about: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setFetching(true);
        const res = await axiosInstance.get(`/team/${id}`);
        const m = res.data.data || res.data;
        setForm({
          name: m.name || "",
          designation: m.designation || "",
          email: m.email || "",
          phone: m.phone || "",
          facebook: m.facebook || "",
          instagram: m.instagram || "",
          twitter: m.twitter || "",
          about: m.about || ""
        });
        setExistingImage(m.image || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load team member details.");
      } finally {
        setFetching(false);
      }
    };

    fetchMember();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.designation.trim()) {
      setError("Please fill in Name and Designation.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axiosInstance.put(`/team/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/admin/allteam");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to update team member. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
            <Section title={"Edit Team Member"} />
            <div className="flex flex-col lg:flex-row">
                <AdminAsideSection />
                <div className="flex-1 w-full min-w-0 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
                        {fetching ?
            <div className="text-gray-500">Loading team member...</div> :

            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold">Edit Team Member</h2>
                                    <p className="text-gray-500 mt-1">
                                        Update this team member's profile.
                                    </p>
                                </div>

                                {error &&
              <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
                                        {error}
                                    </div>
              }

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none mb-3" />


                                    <input
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none mb-3" />


                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="bg-gray-100 rounded-xl px-4 py-3 w-full outline-none" />

                                        <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="bg-gray-100 rounded-xl px-4 py-3 w-full outline-none" />

                                    </div>

                                    <input
                  type="url"
                  name="facebook"
                  value={form.facebook}
                  onChange={handleChange}
                  placeholder="Facebook URL"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none mb-3" />

                                    <input
                  type="url"
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                  placeholder="Instagram URL"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none mb-3" />

                                    <input
                  type="url"
                  name="twitter"
                  value={form.twitter}
                  onChange={handleChange}
                  placeholder="Twitter URL"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none mb-3" />


                                    <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  rows={5}
                  placeholder="About this team member"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none mb-3" />


                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Photo
                                        </label>
                                        <ImageUploader
                    onImageSelect={(file) => {
                      setImageFile(file);
                      setExistingImage("");
                    }}
                    existingImage={existingImage} />

                                        <p className="text-xs text-gray-400 mt-1">
                                            Leave empty to keep the current photo.
                                        </p>
                                    </div>

                                    <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#374256] text-white rounded-lg py-3 disabled:opacity-60">

                                        {loading ? "Updating..." : "Save Changes"}
                                    </button>
                                </form>
                            </div>
            }
                    </div>
                </div>
            </div>
        </>);

}
