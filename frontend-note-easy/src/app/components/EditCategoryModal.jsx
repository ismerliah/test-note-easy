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

function EditCategoryModal({
  isEditCategoryOpen,
  closeEditCategoryModal,
  categoryId,
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getcategories/${categoryId}`,
          { withCredentials: true }
        );
        setName(response.data.name);
        setColor(response.data.color);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(color);
    // console.log(color.toHexString().split("#")[1]);
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/edit-category/${categoryId}`, {
        name: name,
        color: color ? color.toHexString() : color,
      })
      .then((result) => console.log(result), closeEditCategoryModal())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Transition appear show={isEditCategoryOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeEditCategoryModal}
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
                  <div className="absolute top-4 right-4">
                    <IconButton onClick={closeEditCategoryModal}>
                      <FiX size={20} />
                    </IconButton>
                  </div>
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Category
                  </DialogTitle>

                  <form
                    className="mt-6 space-y-6"
                    onSubmit={handleSubmit}
                    method="PUT"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={name}
                          className="w-full rounded-md"
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="color"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Color
                      </label>
                      <div className="mt-2">
                        <ColorPicker
                          value={color}
                          onChange={setColor}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      <Button
                        variant="outlined"
                        onClick={closeEditCategoryModal}
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

export default EditCategoryModal;
