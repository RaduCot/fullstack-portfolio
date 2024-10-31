import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";
import { useState, useEffect } from "react";
import { uploadImage, API_URL } from "../api"; // Import the image upload function

function EditPopup({
  editPopupOpen,
  closeEditPopup,
  workData,
  handleSaveEdit,
}) {
  const [editedWork, setEditedWork] = useState({
    title: "",
    description: "",
    image_url: "",
    client_site_url: "",
    status: true,
  });

  const [imageFile, setImageFile] = useState(null); // State to hold the image file
  const [imagePreview, setImagePreview] = useState(""); // State to hold the preview URL

  // Populate the fields and preview URL when the popup opens with workData
  useEffect(() => {
    if (workData) {
      setEditedWork(workData);
      setImagePreview(API_URL + "/" + workData.image_url); // Set initial image preview
    }
  }, [workData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedWork((prevWork) => ({
      ...prevWork,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the new image
    }
  };

  const handleCancel = () => {
    setEditedWork(workData);
    setImageFile(null);
    setImagePreview(API_URL + "/" + workData.image_url);
    closeEditPopup();
  };

  const handleSave = async () => {
    if (imageFile) {
      try {
        // Upload new image and get the path
        const imagePath = await uploadImage(imageFile);
        const workToSave = { ...editedWork, image_url: imagePath };
        handleSaveEdit(workData.id, workToSave); // Save with new image URL
        handleCancel();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      handleSaveEdit(workData.id, editedWork); // Save without changing the image
      handleCancel();
    }
  };

  return (
    <AnimatePresence>
      {editPopupOpen ? (
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
            className="bg-black max-w-7xl w-full lg:w-2/6 max-h-screen scrollable overflow-y-auto relative text-left px-12 py-8"
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
                value={editedWork.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white focus:ring-blue-500 focus:ring-2 focus:outline-none"
              />

              <label className="text-white font-semibold">Description</label>
              <textarea
                name="description"
                value={editedWork.description}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 h-32 text-white font-normal focus:ring-blue-500 focus:ring-2 focus:outline-none"
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
                value={editedWork.client_site_url}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white font-normal focus:ring-blue-500 focus:ring-2 focus:outline-none"
              />

              <label className="text-white font-semibold flex items-center">
                Visible?
                <input
                  type="checkbox"
                  name="status"
                  checked={editedWork.status}
                  onChange={handleChange}
                  className="ml-2"
                />
                {editedWork.status ? (
                  <Eye size={20} className="ml-2 text-blue-300" />
                ) : (
                  <EyeOff size={20} className="ml-2 text-red-500" />
                )}
              </label>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2"
                  onClick={handleSave} // Call handleSave to include image handling
                >
                  Save
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

export default EditPopup;
