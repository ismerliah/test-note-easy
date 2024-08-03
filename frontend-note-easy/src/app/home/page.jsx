"use client";

import { useEffect, useState } from "react";
import Nav from "../components/nav";
import CreateModal from "../components/create-modal";
import CategoryModal from "../components/category-modal";
import axios from "axios";

export default function HomePage() {
  const [isCreateOpen, setisCreateOpen] = useState(false);
  const [isCategoryOpen, setisCategoryOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  function closeCreateModal() {
    setisCreateOpen(false);
  }

  function openCreateModal() {
    setisCreateOpen(true);
  }

  function closeCategoryModal() {
    setisCategoryOpen(false);
  }

  function openCategoryModal() {
    setisCategoryOpen(true);
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/getnotes");
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="bg-slate-100">
      <Nav />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-10 justify-end gap-2">
          <button
            className=" bg-orange-300 hover:bg-FFA823 text-EEEEEE text-sm font-bold py-2 px-3 rounded inline-flex items-center"
            onClick={openCategoryModal}
          >
            <svg
              className="w-6 h-6 me-2"
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="2em"
              width="2em"
            >
              <path d="M484 443.1V528h-84.5c-4.1 0-7.5 3.1-7.5 7v42c0 3.8 3.4 7 7.5 7H484v84.9c0 3.9 3.2 7.1 7 7.1h42c3.9 0 7-3.2 7-7.1V584h84.5c4.1 0 7.5-3.2 7.5-7v-42c0-3.9-3.4-7-7.5-7H540v-84.9c0-3.9-3.1-7.1-7-7.1h-42c-3.8 0-7 3.2-7 7.1zm396-144.7H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z" />
            </svg>
            <span>New Category</span>
          </button>

          <button
            className=" bg-C75B7A hover:bg-A91D3A text-EEEEEE text-sm font-bold py-2 px-3 rounded inline-flex items-center"
            onClick={openCreateModal}
          >
            <svg
              className="w-6 h-6 me-2"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>Add new note</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className=" bg-white rounded-lg border-y-indigo-950 shadow-lg p-6 mt-4 mb-5 flex flex-col justify-between"
            >
              <div className="text-gray-900 font-bold text-xl mb-2">
                {note.title}
              </div>
              <p className="text-gray-700 text-base mb-2">{note.content}</p>
              <div className="flex items-center justify-end mt-auto">
                <div className="text-sm text-right">
                  <p className="text-gray-900 leading-none">{note.username}</p>
                  <p className="text-gray-600">{note.date}</p>
                  <p className="text-gray-600">{note.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CreateModal isCreateOpen={isCreateOpen} closeCreateModal={closeCreateModal} />
      <CategoryModal isCategoryOpen={isCategoryOpen} closeCategoryModal={closeCategoryModal} />
    </div>
  );
}
