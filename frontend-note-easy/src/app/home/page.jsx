"use client";

import { useEffect, useState } from "react";
import Nav from "../components/nav";
import Modal from "../components/modal";
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
    <div className="bg-slate-100 h-full">
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
        {
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-lg border-y-indigo-950 shadow-lg p-6 mt-4"
            >
              <h2 className="text-2xl font-bold">{note.title}</h2>
              <p className="text-gray-500">{note.username}</p>
              <p className="text-gray-500">{note.content}</p>
              <p className="text-gray-500">{note.date}</p>
              
            </div>
          ))
        }
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}
