import React, { useState } from "react";
import AdminAsideSection from '../AdminAsideSection'
import Section from '../../../components/Section'
import axiosInstance from "../../../utils/axiosConfig"

const AddTeam = () => {
    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        email: "",
        phone: "",
        facebook: "",
        instagram: "",
        twitter: "",
        about: "",
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            if (image) {
                data.append("image", image);
            }
            const res = await axiosInstance.post("/team/addteam", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                alert("Team Member Added Successfully");

                setFormData({
                    name: "",
                    designation: "",
                    email: "",
                    phone: "",
                    facebook: "",
                    instagram: "",
                    twitter: "",
                    about: "",
                });

                setImage(null);
            }
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Section title={"Add Team Member"} />
            <div className="flex flex-col lg:flex-row">
                <AdminAsideSection />
                <div className="flex-1 w-full min-w-0 bg-gray-50">
                    <div className="container-fluid px-4 py-4">
                        <div
                            className="bg-white shadow rounded-4 p-4"
                            style={{ maxWidth: "900px", margin: "auto" }}
                        >
                            <h2 className="fw-bold mb-2">Add Team Member</h2>
                            <p className="text-muted mb-4">
                                Fill the details of your team member.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Designation"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            placeholder="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="url"
                                        className="form-control form-control-lg"
                                        placeholder="Facebook URL"
                                        name="facebook"
                                        value={formData.facebook}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="url"
                                        className="form-control form-control-lg"
                                        placeholder="Instagram URL"
                                        name="instagram"
                                        value={formData.instagram}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="url"
                                        className="form-control form-control-lg"
                                        placeholder="Twitter URL"
                                        name="twitter"
                                        value={formData.twitter}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <textarea
                                        rows="5"
                                        className="form-control"
                                        placeholder="About Team Member"
                                        name="about"
                                        value={formData.about}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="border rounded-4 w-100 p-5 text-center"
                                        style={{
                                            cursor: "pointer",
                                            borderStyle: "dashed",
                                        }}
                                    >
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleImage}
                                        />

                                        <i
                                            className="fa fa-cloud-upload"
                                            style={{ fontSize: 45, color: "#6c757d" }}
                                        ></i>

                                        <h5 className="mt-3">
                                            {image ? image.name : "Choose Image or Drag & Drop"}
                                        </h5>

                                        <small className="text-muted">
                                            PNG, JPG, JPEG
                                        </small>
                                    </label>
                                </div>

                                <button
                                    className="btn btn-primary btn-lg px-5"
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Add Team Member"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddTeam