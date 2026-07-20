import { useState } from "react";
import ImageUploader from "./ImageUploader";

export default function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "",
    amenities: "",
    bedrooms: 0,
    bathrooms: 0,
    size: "",
    year: "",
    description: "",
    image: null,
  });

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        
      
      <h2 className="text-2xl font-semibold">Add Key Property Information</h2>

      <p className="text-gray-500 mt-1 mb-8">
        Describe your real estate asset.
      </p>

      <div className="space-y-5">
        <input
          placeholder="Property Name"
          className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-3 outline-none"
        />

        <input
          placeholder="Location"
          className="w-full bg-gray-100 rounded-xl px-4 mb-3 py-3 outline-none"
        />

        <select className="w-full bg-gray-100 rounded-xl mb-3 px-4 py-3 outline-none">
          <option>Select Property Type</option>
          <option>Villa</option>
          <option>Apartment</option>
          <option>Office</option>
          <option>Land</option>
        </select>

        <input
          placeholder="Amenities"
          className="w-full bg-gray-100 rounded-xl mb-3 px-4 py-3 outline-none"
        />

       <div className="grid grid-cols-2 gap-4">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <input type="number" placeholder="Bedrooms" className="bg-gray-100 rounded-xl px-4 py-3 w-full" />
  <input type="number" placeholder="Bathrooms" className="bg-gray-100 rounded-xl px-4 py-3 w-full" />
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <input placeholder="Size (SQM)" className="bg-gray-100 rounded-xl px-4 py-3 w-full" />
  <input placeholder="Year Built" className="bg-gray-100 rounded-xl px-4 py-3 w-full" />
</div>


        <textarea
          rows={5}
          placeholder="About Property"
          className="w-full bg-gray-100 rounded-xl px-4 py-3"
        />

        <ImageUploader />

        <button className="w-full bg-[#374256] text-white rounded-lg py-3">
          Continue
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}
