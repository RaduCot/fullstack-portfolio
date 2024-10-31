import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Trash2, Eye, EyeOff, Link2, X } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import { API_URL } from "../api";
import { useSwipeable } from "react-swipeable";

function WorkPopup({
  selectedWork,
  closePopup,
  adminMode,
  toggleWorkStatus,
  setWorks,
  setSelectedWork,
  handleDeleteClick,
  handleEditClick,
  isModalOpen,
  confirmDelete,
  setIsModalOpen,
}) {
  const handlers = useSwipeable({
    onSwipedLeft: () => closePopup,
    onSwipedRight: () => closePopup,
  });
  return (
    <AnimatePresence>
      {selectedWork && (
        <motion.div
        {...handlers}
          className="z-10 fixed inset-0 bg-neutral-900 bg-opacity-80 backdrop-blur-lg"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={closePopup}
        >
          <X
            size={24}
            className="absolute cursor-pointer top-6 right-6 text-white hover:text-red-500 mix-blend-normal"
            onClick={closePopup}
          />
          <div className="relative mt-10 md:mt-0 w-full h-full flex justify-center overflow-y-auto items-center scrollable">
            <motion.div
              className="relative h-max flex-grow bg-black max-w-full lg:max-w-6xl text-left"
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 50,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={API_URL + "/" + selectedWork.image_url}
                alt={selectedWork.title}
                className="w-full object-cover"
              />
              <div className="flex flex-col gap-2 pt-6 pb-10 px-10">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl">
                    {adminMode &&
                      (selectedWork.status ? (
                        <Eye
                          size={24}
                          className="inline-block mb-1 mr-4 cursor-pointer text-white hover:text-blue-300"
                          onClick={async (e) => {
                            e.stopPropagation(); // Toggle status and update in database

                            const updatedWork = await toggleWorkStatus(
                              selectedWork.id,
                              false
                            ); // Update both works and selectedWork states

                            setWorks((prevWorks) =>
                              prevWorks.map((w) =>
                                w.id === selectedWork.id ? updatedWork : w
                              )
                            );
                            setSelectedWork(updatedWork); // Update selectedWork to reflect changes
                          }}
                        />
                      ) : (
                        <EyeOff
                          size={24}
                          className="inline-block mb-1 mr-4 cursor-pointer text-red-500 hover:text-red-300"
                          onClick={async (e) => {
                            e.stopPropagation(); // Toggle status and update in database

                            const updatedWork = await toggleWorkStatus(
                              selectedWork.id,
                              true
                            ); // Update both works and selectedWork states

                            setWorks((prevWorks) =>
                              prevWorks.map((w) =>
                                w.id === selectedWork.id ? updatedWork : w
                              )
                            );
                            setSelectedWork(updatedWork); // Update selectedWork to reflect changes
                          }}
                        />
                      ))}

                    {selectedWork.title}
                  </h2>

                  {/* Admin actions */}
                  {adminMode ? (
                    <div className="flex gap-4">
                      <Pencil
                        size={24}
                        className="text-blue-500 hover:text-blue-600 cursor-pointer"
                        onClick={() => {
                          handleEditClick(selectedWork);
                        }}
                      />
                      <Trash2
                        size={24}
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                        onClick={() => handleDeleteClick(selectedWork)}
                      />
                    </div>
                  ) : null}
                </div>
                <p className="text-gray-400 font-normal">
                  {selectedWork.description}
                </p>
                <a
                  href={selectedWork.client_site_url}
                  className="w-fit text-clip text-blue-500 font-normal hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Link2 size={16} className="inline-block text-white mr-2" />
                  {selectedWork.client_site_url}
                </a>

                {/* Confirmation Modal */}
                <ConfirmationModal
                  isOpen={isModalOpen}
                  message="Are you sure you want to delete this work?"
                  onConfirm={confirmDelete}
                  onCancel={() => setIsModalOpen(false)}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default WorkPopup;
