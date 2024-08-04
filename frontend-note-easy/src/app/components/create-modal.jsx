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

function CreateModal({ isCreateOpen, closeCreateModal }) {
  const [username, setUsername] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [categories, setCategories] = useState([]);
  const [categoryNote, setCategoryNote] = useState();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user", {
          withCredentials: true,
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error(error);
        
      }
    };
    fetchUser();

    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getcategories",
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
      .post("http://localhost:3001/api/create-notes", {
        username,
        title,
        content,
        category: categoryNote,
        date: today.toLocaleDateString(),
        time: today.toLocaleTimeString(),
      })
      .then((result) => console.log(result), closeCreateModal())
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
                  <button
                    className="absolute top-4 right-4 text-gray-950 "
                    onClick={closeCreateModal}
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
                        <input
                          id="title"
                          name="title"
                          type="text"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                          onChange={(e) => setTitle(e.target.value)}
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
                        <textarea
                          id="content"
                          rows="4"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm"
                          required
                          placeholder="Write here..."
                          onChange={(e) => setContent(e.target.value)}
                        ></textarea>
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
                        <select
                          value={categories.name}
                          onChange={(e) => setCategoryNote(e.target.value)}
                          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
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

export default CreateModal;
