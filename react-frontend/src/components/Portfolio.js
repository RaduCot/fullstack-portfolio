// Libraries
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Eye, EyeOff } from "lucide-react";

// API
import {
  API_URL,
  fetchWorks,
  toggleWorkStatus,
  createWork,
  deleteWork,
  editWork,
} from "../api";

// Components
import WorkPopup from "./WorkPopup";
import AddPopup from "./AddPopup";
import EditPopup from "./EditPopup";

// Assets
import avatar from "../assets/avatar.png";
import gridHash from "../assets/grid_hash.svg";

const Portfolio = () => {
  const [works, setWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [adminMode, setAdminMode] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workToDelete, setWorkToDelete] = useState(null);

  const [addPopupOpen, setAddPopupOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);

  // Delete work
  const handleDeleteClick = (work) => {
    setWorkToDelete(work);
    setIsModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (workToDelete) {
      // Delete work and update in database
      await deleteWork(workToDelete.id);
      setWorks((prevWorks) =>
        prevWorks.filter((w) => w.id !== workToDelete.id)
      );
      setSelectedWork(null);
    }
    setIsModalOpen(false);
    setWorkToDelete(null);
  };

  // Set the selected work
  const handleWorkClick = (work) => {
    setSelectedWork(work);
  };

  // Close the popup
  const closePopup = () => {
    setSelectedWork(null);
  };

  // Open the add popup
  const handleAddClick = () => {
    setAddPopupOpen(true);
  };

  // Close the add popup
  const closeAddPopup = () => {
    setAddPopupOpen(false);
  };

  // Save new work
  const handleSaveNewWork = async (newWork) => {
    try {
      const savedWork = await createWork(newWork);

      // Optionally, update the local state or list of works here
      setWorks((prevWorks) => [...prevWorks, savedWork]);

      closeAddPopup();
    } catch (error) {
      console.error("Error saving new work:", error);
      alert("There was an error saving the new work. Please try again.");
    }
  };

  // Open the edit popup
  const handleEditClick = (work) => {
    setSelectedWork(work); // Set the work to be edited
    setEditPopupOpen(true);
  };

  // Close the edit popup
  const closeEditPopup = () => {
    setEditPopupOpen(false);
  };

  // Save edited work
  const handleSaveEdit = async (id, updatedData) => {
    try {
      const editedWork = await editWork(id, updatedData);

      // Update the local state or list of works
      setWorks((prevWorks) =>
        prevWorks.map((work) => (work.id === id ? editedWork : work))
      );

      // Update the selectedWork state to reflect changes in the WorkPopup
      setSelectedWork(editedWork);

      closeEditPopup();
    } catch (error) {
      console.error("Error saving edited work:", error);
      alert("There was an error saving the edited work. Please try again.");
    }
  };

  // Fetch works
  useEffect(() => {
    const loadWorks = async () => {
      const data = await fetchWorks();
      setWorks(data);
    };

    loadWorks();
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = selectedWork ? "hidden" : "auto";
  }, [selectedWork]);

  return (
    <div className="relative bg-black text-white font-bold min-h-svh">
      <div className="relative">
        <div
          className="absolute inset-0 bg-[length:512] lg:bg-[length:1024px] bg-repeat bg-fixed opacity-80"
          style={{
            backgroundImage: `url(${gridHash})`,
            mixBlendMode: "normal",
          }}
        />
        <header className="flex max-w-6xl flex-row mx-auto py-12 justify-between">
          <div className="z-10 flex flex-row gap-8">
            <img src={avatar} alt="Avatar" className="w-24 h-24" />
            <div className="flex flex-col text-left gap-2">
              <h1 className="text-5xl font-bold">Anon Anonymous</h1>
              <p className="text-gray-400 text-normal">
                Freelance Digital Artist, Illustrator
              </p>
            </div>
          </div>
          {/**
          <nav className="z-10 mt-auto flex justify-end space-x-6 text-base">
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Gallery
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
          </nav>
           */}
        </header>
      </div>

      <div className="flex items-center text-white bg-gray-900 justify-center py-4 space-x-4">
        <p>
          {adminMode
            ? "You are now in Admin mode."
            : "You are now in Visitor mode."}
        </p>

        <div
          onClick={() => setAdminMode(!adminMode)}
          className={`w-10 h-5 flex items-center ${
            adminMode ? "justify-end" : "justify-start"
          } bg-white rounded-full p-1 cursor-pointer transition-colors duration-300`}
        >
          <motion.div
            className={`${
              adminMode ? "bg-blue-500" : "bg-black"
            } w-4 h-4 rounded-full`}
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
      </div>

      {/* Grid of works */}
      <main className="relative flex justify-center flex-grow">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Add new work plus button */}
          {adminMode && (
            <div
              className="m-4 border-4 border-dashed hover:border-solid border-gray-500 hover:border-blue-500 relative cursor-pointer aspect-square duration-300"
              onClick={handleAddClick}
            >
              <Plus size={48} className="absolute inset-0 m-auto text-white" />
            </div>
          )}

          {/* Works */}
          {works
            .filter((work) => adminMode || work.status)
            .sort((a, b) => b.id - a.id) // Sort by ID in descending order
            .map((work) => (
              <div
                key={work.id}
                onClick={() => handleWorkClick(work)}
                className="relative cursor-pointer aspect-square"
              >
                <img
                  src={API_URL + "/" + work.image_url}
                  alt={work.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  className=""
                />

                {/* Overlay for hidden works*/}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white text-lg font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: work.status ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <EyeOff
                    size={48}
                    className="absolute cursor-pointer text-white"
                  />
                </motion.div>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-lg font-semibold"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {adminMode &&
                    (work.status ? (
                      <Eye
                        size={24}
                        className="absolute cursor-pointer top-4 right-4 text-white hover:text-blue-300"
                        onClick={async (e) => {
                          e.stopPropagation();
                          // Toggle status and update in database
                          const updatedWork = await toggleWorkStatus(
                            work.id,
                            false
                          );
                          setWorks((prevWorks) =>
                            prevWorks.map((w) =>
                              w.id === work.id ? updatedWork : w
                            )
                          );
                        }}
                      />
                    ) : (
                      <EyeOff
                        size={24}
                        className="absolute cursor-pointer top-4 right-4 text-red-500 hover:text-red-300"
                        onClick={async (e) => {
                          e.stopPropagation();
                          // Toggle status and update in database
                          const updatedWork = await toggleWorkStatus(
                            work.id,
                            true
                          );
                          setWorks((prevWorks) =>
                            prevWorks.map((w) =>
                              w.id === work.id ? updatedWork : w
                            )
                          );
                        }}
                      />
                    ))}

                  {work.title}
                </motion.div>
              </div>
            ))}
        </div>
      </main>

      {/* Popup */}
      <WorkPopup
        selectedWork={selectedWork}
        closePopup={closePopup}
        adminMode={adminMode}
        toggleWorkStatus={toggleWorkStatus}
        setWorks={setWorks}
        setSelectedWork={setSelectedWork}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        isModalOpen={isModalOpen}
        confirmDelete={confirmDelete}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Add Popup */}
      <AddPopup
        addPopupOpen={addPopupOpen}
        closeAddPopup={closeAddPopup}
        handleSaveNewWork={handleSaveNewWork}
      />

      {/* Edit Popup */}
      <EditPopup
        editPopupOpen={editPopupOpen}
        closeEditPopup={closeEditPopup}
        workData={selectedWork}
        handleSaveEdit={handleSaveEdit}
      />
    </div>
  );
};

export default Portfolio;
