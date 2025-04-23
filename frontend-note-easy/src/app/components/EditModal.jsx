import React, { useEffect, useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import axios from "axios";
import { Input, Select } from "antd";
import { Button, IconButton } from "@mui/material";
import { FiX } from "react-icons/fi";

function EditModal({ isEditOpen, closeEditModal, noteId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [editHistory, setEditHistory] = useState([]);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const { TextArea } = Input;

  useEffect(() => {
    if (noteId) {
      const fetchNote = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/getnotes/${noteId}`
          );
          const note = response.data;
          setTitle(note.title);
          setContent(note.content);
          setCategory(note.category);
          setEditHistory(note.editHistory);
        } catch (error) {
          console.error(error);
        }
      };
      fetchNote();
    }
  }, [noteId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getcategories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/edit-notes/${noteId}`,
        {
          title,
          content,
          category,
          date: today.toLocaleDateString(),
          time: today.toLocaleTimeString(),
        },
        { withCredentials: true }
      );
      //console.log(result);
      closeEditModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Transition appear show={isEditOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
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
                  <IconButton onClick={closeEditModal}>
                    <FiX size={20} />
                  </IconButton>
                </div>
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Note
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
                        value={title}
                        className="w-full rounded-md"
                        required
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
                      <TextArea
                        id="content"
                        name="content"
                        placeholder="Write here..."
                        value={content}
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
                    <div className="mt-2">
                      <Select
                        value={category}
                        placeholder="Select a person"
                        onChange={setCategory}
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
                      onClick={closeEditModal}
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
  );
}

export default EditModal;
