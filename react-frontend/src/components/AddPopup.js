import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { uploadImage } from "../api";

function AddPopup({ addPopupOpen, closeAddPopup, handleSaveNewWork }) {
  const [newWork, setNewWork] = useState({
    title: "",
    description: "",
    image_url: "",
    client_site_url: "",
    status: true,
  });

  const [imageFile, setImageFile] = useState(null); // State to hold the image file
  const [imagePreview, setImagePreview] = useState(""); // State to hold the preview URL

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewWork((prevWork) => ({
      ...prevWork,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleCancel = () => {
    // Reset the form fields
    setNewWork({
      title: "",
      description: "",
      image_url: "",
      client_site_url: "",
      status: true,
    });
    setImageFile(null);
    setImagePreview("");
    closeAddPopup();
  };

  const handlePublish = async () => {
    if (imageFile) {
      try {
        const imagePath = await uploadImage(imageFile); // Call the uploadImage function
        const workToSave = { ...newWork, image_url: imagePath };
        handleSaveNewWork(workToSave);
        handleCancel(); // Close the popup after saving
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <AnimatePresence>
      {addPopupOpen ? (
        <motion.div
          className="fixed z-10 inset-0 bg-neutral-900 bg-opacity-80 flex items-center justify-center lg:p-4 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <X
            size={24}
            className="absolute cursor-pointer top-6 right-6 text-white hover:text-red-500"
            onClick={handleCancel}
          />
          <motion.div
            className="bg-black max-w-7xl w-full lg:w-2/6 max-h-screen overflow-y-auto relative text-left px-12 py-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col grow gap-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover"
                />
              )}

              <label className="text-white font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={newWork.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white focus:ring-blue-500 focus:ring-2 focus:outline-none"
              />

              <label className="text-white font-semibold">Description</label>
              <textarea
                name="description"
                value={newWork.description}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white font-normal focus:ring-blue-500 focus:ring-2 focus:outline-none"
              />

              <label className="text-white font-semibold">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className=""
              />

              <label className="text-white font-semibold">
                Client Site URL
              </label>
              <input
                type="text"
                name="client_site_url"
                value={newWork.client_site_url}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white font-normal focus:ring-blue-500 focus:ring-2 focus:outline-none"
              />

              <label className="text-white font-semibold flex items-center">
                Visible?
                <input
                  type="checkbox"
                  name="status"
                  checked={newWork.status}
                  onChange={handleChange}
                  className="ml-2"
                />
                {newWork.status ? (
                  <Eye size={20} className="ml-2 text-blue-300" />
                ) : (
                  <EyeOff size={20} className="ml-2 text-red-500" />
                )}
              </label>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2"
                  onClick={handlePublish} // Call handlePublish instead of handleSaveNewWork directly
                >
                  Publish
                </button>
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default AddPopup;
