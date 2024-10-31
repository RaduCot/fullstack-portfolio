import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="flex flex-col bg-white p-6 text-center max-w-sm gap-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-black">{message}</p>
            <div className="flex gap-6 justify-between">
              <button
                onClick={onConfirm}
                className="grow bg-red-500 hover:bg-red-600 text-white px-4 py-2"
              >
                Delete
              </button>
              <button
                onClick={onCancel}
                className="grow bg-gray-600 hover:bg-gray-700 text-white px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
