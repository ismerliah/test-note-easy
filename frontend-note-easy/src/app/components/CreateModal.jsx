import React, { useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { Input, Select } from "antd";
import { Button, IconButton } from "@mui/material";

function CreateModal({ isCreateOpen, closeCreateModal }) {
  const [username, setUsername] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [categories, setCategories] = useState([]);
  const [categoryNote, setCategoryNote] = useState();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const { TextArea } = Input;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          {
            withCredentials: true,
          }
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();

    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getcategories`,
          { withCredentials: true }
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/create-notes`, {
        username,
        title,
        content,
        category: categoryNote,
        date: today.toLocaleDateString(),
        time: today.toLocaleTimeString(),
      })
      .then((result) =>
        //console.log(result),
        closeCreateModal()
      )
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Transition appear show={isCreateOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeCreateModal}>
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
                    <IconButton onClick={closeCreateModal}>
                      <FiX size={20} />
                    </IconButton>
                  </div>
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add new note
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
                        Title
                      </label>
                      <div className="mt-2">
                        <Input
                          id="title"
                          name="title"
                          type="text"
                          required
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full rounded-md"
                        />
                        
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="content"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Content
                      </label>
                      <div className="mt-2">
                        <TextArea
                          id="content"
                          name="content"
                          type="textarea"
                          placeholder="Write here..."
                          rows={4}
                          maxLength={256}
                          required
                          onChange={(e) => setContent(e.target.value)}
                          className="w-full rounded-md"
                        />
                        
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>

                      <div className="mt-2 ">
                        <Select
                          placeholder="Select a category"
                          onChange={setCategoryNote}
                          options={categories.map((cat) => ({
                            label: cat.name,
                            value: cat.name,
                          }))}
                          className="w-full rounded-md"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      <Button
                        variant="outlined"
                        onClick={closeCreateModal}
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
                      {/* <button
                        type="submit"
                        className="inline-flex rounded-md bg-gray-600 hover:bg-151515 text-EEEEEE px-4 py-2 text-sm font-medium"
                      >
                        Save
                      </button> */}
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

export default CreateModal;
