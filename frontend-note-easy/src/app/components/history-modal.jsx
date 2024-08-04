import React, { useEffect, useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import axios from "axios";

function HistoryModal({ isHistoryOpen, closeHistoryModal, noteId }) {
  const [editHistory, setEditHistory] = useState([]);

  useEffect(() => {
    if (noteId) {
      const fetchHistory = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/getnotes/${noteId}`
          );
          const note = response.data;
          setEditHistory(note.editHistory);
        } catch (error) {
          console.error(error);
        }
      };
      fetchHistory();
    }
  }, [noteId]);

  return (
    <Transition appear show={isHistoryOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeHistoryModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <button
                  className="absolute top-4 right-4 text-gray-950"
                  onClick={closeHistoryModal}
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                </button>
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Show Edit History
                </DialogTitle>
                <div className="mt-6">
                  
                  <div className="mt-4 space-y-4">
                    {editHistory.map((entry, index) => (
                      <div
                        key={index}
                        className="border rounded-md p-3 bg-gray-50"
                      >
                        <p className="text-sm text-gray-600">
                          Edited at:{" "}
                          {new Date(entry.updatedAt).toLocaleString()}
                        </p>
                        <ul className="list-disc list-inside">
                          {Object.keys(entry.changes).map((key) => (
                            <li key={key} className="text-sm text-gray-700">
                              <strong>{key}:</strong> {entry.changes[key]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default HistoryModal;
