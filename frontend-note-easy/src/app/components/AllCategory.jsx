import React, { useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import { FiMoreVertical, FiX } from "react-icons/fi";
import EditCategoryModal from "./EditCategoryModal";

function AllCategory({ isAllCategoryOpen, closeAllCategoryModal }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [isEditCategoryOpen, setisEditCategoryOpen] = useState(false);

  function openEditCategoryModal(categoryId) {
    setSelectedCategoryId(categoryId);
    setisEditCategoryOpen(true);
  }

  function closeEditCategoryModal() {
    setisEditCategoryOpen(false);
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getcategories`,
          { withCredentials: true }
        );
        setCategories(response.data);
        console.log(categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Transition appear show={isAllCategoryOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeAllCategoryModal}
        >
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
                    className="absolute top-4 right-4 text-gray-950 "
                    onClick={closeAllCategoryModal}
                  >
                    <FiX size={20} />
                  </button>
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Category
                  </DialogTitle>

                  <div className="mt-6 space-y-6">
                    <div className="flex flex-col gap-4">
                      {categories.map((categories, index) => (
                        <div
                          key={categories._id}
                          className="flex flex-row justify-between items-center"
                        >
                          <div className="text-sm">{categories.name}</div>
                          <button
                            onClick={() => {
                              openEditCategoryModal(categories._id);
                              closeAllCategoryModal();
                            }}
                          >
                            <FiMoreVertical />
                          </button>
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
      <EditCategoryModal
        isEditCategoryOpen={isEditCategoryOpen}
        closeEditCategoryModal={closeEditCategoryModal}
        categoryId={selectedCategoryId}
      />
    </>
  );
}

export default AllCategory;
