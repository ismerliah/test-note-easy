"use client";

import { useEffect, useState } from "react";
import CreateModal from "../components/CreateModal";
import CategoryModal from "../components/CategoryModal";
import axios from "axios";
import EditModal from "../components/EditModal";
import HistoryModal from "../components/HistoryModal";
import { FiFolderPlus, FiPlusCircle } from "react-icons/fi";
import ProfileDropdown from "../components/ProfileDropdown";
import EditCategoryModal from "../components/EditCategoryModal";
import { Button } from "@mui/material";

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
        console.log(response.data);
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
        console.log(response.data);
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
      <ProfileDropdown />
      <div className="mx-auto space-y-3 max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-10 justify-end gap-2">
          <button
            className="bg-FFA823 hover:bg-orange-300 text-EEEEEE text-sm font-bold px-3 rounded flex gap-2 items-center"
            onClick={openCategoryModal}
          >
            <FiFolderPlus size={20} />
            <span>New Category</span>
          </button>

          <button
            className="bg-A91D3A hover:bg-C75B7A text-EEEEEE text-sm font-bold px-3 rounded flex gap-2 items-center"
            onClick={openCreateModal}
          >
            <FiPlusCircle size={20} />
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

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 py-3">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-lg border-y-indigo-950 shadow-lg p-6 flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-end">
                <Button onClick={() => openHistoryModal(note._id)}>
                  Show Edit History
                </Button>
              </div>
              <div className="relative flex h-10 justify-start gap-2 items-center">
                {categories
                  .filter((cat) => cat.name === note.category)
                  .map((cat) => (
                    <button
                      key={cat._id}
                      className="px-3 h-8 rounded-3xl items-center justify-center"
                      style={{ backgroundColor: `#${cat.color}` }}
                    >
                      <p className="text-black text-sm font-bold">
                        {note.category}
                      </p>
                    </button>
                  ))}
              </div>
              <div className="text-gray-900 font-bold text-xl mb-2 break-word">
                {note.title}
              </div>
              <p className="text-gray-500 text-base mb-2 break-word">
                {note.content}
              </p>
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
