import React, { useEffect, useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import axios from "axios";
import { IconButton } from "@mui/material";
import { FiX } from "react-icons/fi";

function HistoryModal({ isHistoryOpen, closeHistoryModal, noteId }) {
  const [editHistory, setEditHistory] = useState([]);

  useEffect(() => {
    if (noteId) {
      const fetchHistory = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/getnotes/${noteId}`
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
                <div className="absolute top-4 right-4">
                  <IconButton onClick={closeHistoryModal}>
                    <FiX size={20} />
                  </IconButton>
                </div>
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
