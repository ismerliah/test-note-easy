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
import { ColorPicker, Input } from "antd";
import { FiX } from "react-icons/fi";
import { Button, IconButton } from "@mui/material";
import tinycolor from "tinycolor2";

function CategoryModal({ isCategoryOpen, closeCategoryModal }) {
  const [category, setCategory] = useState();
  const [categoryColor, setCategoryColor] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(categoryColor);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
        name: category,
        color: categoryColor ? categoryColor.toHexString() : tinycolor("#E4E4E4").toHexString(),
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
                  <div className="absolute top-4 right-4">
                    <IconButton
                      onClick={() => {
                        closeCategoryModal();
                        setCategoryColor("#E4E4E4");
                      }}
                    >
                      <FiX size={20} />
                    </IconButton>
                  </div>
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
                        <Input
                          id="category"
                          name="category"
                          type="text"
                          className="w-full rounded-md"
                          required
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
                          value={categoryColor}
                          onChange={setCategoryColor}
                          defaultValue={"#E4E4E4"}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      <Button
                        variant="outlined"
                        onClick={closeCategoryModal}
                        style={{
                          borderRadius: "6px",
                        }}
                        disableElevation
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        style={{
                          borderRadius: "6px",
                        }}
                        disableElevation
                      >
                        Save
                      </Button>
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

export default CategoryModal;
