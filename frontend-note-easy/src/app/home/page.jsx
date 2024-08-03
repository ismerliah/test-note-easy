"use client";

import { useEffect, useState } from "react";
import Nav from "../components/nav";
import CreateModal from "../components/create-modal";
import axios from "axios";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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
        <div className="relative flex h-10 justify-end">
          <button
            className=" bg-C75B7A hover:bg-A91D3A text-EEEEEE text-sm font-bold py-2 px-3 rounded inline-flex items-center"
            onClick={openModal}
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
      <CreateModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}
