"use client";

import { useEffect, useState } from "react";
import Nav from "../components/nav";
import CreateModal from "../components/create-modal";
import CategoryModal from "../components/category-modal";
import axios from "axios";
import EditModal from "../components/edit-modal";
import HistoryModal from "../components/history-modal";

export default function HomePage() {
  const [isCreateOpen, setisCreateOpen] = useState(false);
  const [isCategoryOpen, setisCategoryOpen] = useState(false);
  const [isEditOpen, setisEditOpen] = useState(false);
  const [isHistoryOpen, setisHistoryOpen] = useState(false);

  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedNoteId, setSelectedNoteId] = useState(null);

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
    setSelectedNoteId(null);
  }

  function closeEditModal() {
    setisEditOpen(false);
  }

  function openEditModal(noteId) {
    setSelectedNoteId(noteId);
    setisEditOpen(true);
  }

  function closeHistoryModal() {
    setisHistoryOpen(false);
  }

  function openHistoryModal(noteId) {
    setSelectedNoteId(noteId);
    setisHistoryOpen(true);
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getnotes`
        );
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();

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

  const filteredNotes =
    selectedCategory === "All"
      ? notes
      : notes.filter((note) => note.category === selectedCategory);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Nav />
      <div className="mx-auto space-y-3 max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-10 justify-end gap-2">
          <button
            className="bg-orange-300 hover:bg-FFA823 text-EEEEEE text-sm font-bold py-2 px-3 rounded inline-flex items-center"
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
            className="bg-C75B7A hover:bg-A91D3A text-EEEEEE text-sm font-bold py-2 px-3 rounded inline-flex items-center"
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

        <div className="relative flex h-10 justify-end gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-32 px-3 border border-gray-300 rounded-md"
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-lg border-y-indigo-950 shadow-lg p-6 flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-end">
                <button
                  className="text-sm text-003285 hover:text-A91D3A"
                  onClick={() => openHistoryModal(note._id)}
                >
                  Show Edit History
                </button>
              </div>
              <div className="relative flex h-10 justify-start gap-2 items-center">
                <button className="bg-003285 border-003285 border border-spacing-1 py-1 px-3 h-8 rounded-3xl items-center justify-center">
                  <p className="text-white text-sm font-bold">
                    {note.category}
                  </p>
                </button>
              </div>
              <div className="text-gray-900 font-bold text-xl mb-2">
                {note.title}
              </div>
              <div className="text-sm">
                <p className="text-gray-900 leading-none">
                  by: {note.username}
                </p>
              </div>
              <p className="text-gray-500 text-base mb-2">{note.content}</p>
              <div className="flex items-center justify-end mt-auto">
                <div className="text-sm text-right">
                  <p className="text-gray-900">Date : {note.date}</p>
                  <p className="text-gray-900">Time : {note.time}</p>
                </div>
              </div>
              <div className="text-left">
                <button
                  className="bg-C75B7A hover:bg-A91D3A text-EEEEEE border border-spacing-1 py-1 px-3 h-8 rounded items-center justify-center"
                  onClick={() => openEditModal(note._id)}
                >
                  Edit Note
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CreateModal
        isCreateOpen={isCreateOpen}
        closeCreateModal={closeCreateModal}
      />
      <CategoryModal
        isCategoryOpen={isCategoryOpen}
        closeCategoryModal={closeCategoryModal}
      />
      <EditModal
        isEditOpen={isEditOpen}
        closeEditModal={closeEditModal}
        noteId={selectedNoteId}
      />
      <HistoryModal
        isHistoryOpen={isHistoryOpen}
        closeHistoryModal={closeHistoryModal}
        noteId={selectedNoteId}
      />
    </div>
  );
}
