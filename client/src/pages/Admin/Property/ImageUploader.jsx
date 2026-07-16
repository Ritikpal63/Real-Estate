import { useState } from "react";
// import { UploadCloud } from "lucide-react";

export default function ImageUploader() {
  const [preview, setPreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <label className="border-2 border-dashed border-gray-300 rounded-2xl h-56 flex flex-col justify-center items-center cursor-pointer hover:border-blue-500 transition">
        <input type="file" hidden onChange={handleImage} />

        {preview ? (
          <img
            src={preview}
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <>
            {/* <UploadCloud size={40}/> */}

            <p className="mt-4 text-gray-500">Choose image or Drag & Drop</p>

            <span className="text-sm text-gray-400">JPG PNG WEBP</span>
          </>
        )}
      </label>
    </div>
  );
}
