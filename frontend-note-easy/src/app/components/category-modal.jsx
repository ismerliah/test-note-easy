import React, { useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import { ColorPicker } from 'antd';
import { FiX } from 'react-icons/fi';

function CategoryModal({ isCategoryOpen, closeCategoryModal }) {
  const [category, setCategory] = useState();
  const [categoryColor, setCategoryColor] = useState("000000");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
        name: category,
        color: categoryColor.toHexString().split("#")[1],
      })
      .then((result) => console.log(result), closeCategoryModal())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Transition appear show={isCategoryOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeCategoryModal}>
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
                    onClick={closeCategoryModal}
                  >
                    <FiX size={20}/>
                  </button>
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add new category
                  </DialogTitle>

                  <form
                    className="mt-6 space-y-6"
                    onSubmit={handleSubmit}
                    method="POST"
                  >
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="mt-2">
                        <input
                          id="category"
                          name="category"
                          type="text"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Color
                      </label>
                      <div className="mt-2">
                        <ColorPicker
                          format="hex"
                          value={categoryColor}
                          onChange={setCategoryColor}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex rounded-md bg-gray-600 hover:bg-151515 text-EEEEEE px-4 py-2 text-sm font-medium"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default CategoryModal