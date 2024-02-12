"use client";

import { Toaster } from "sonner";
import { NewNoteCard } from "./components/new-note-card";
import { useState } from "react";
import { NoteCard } from "./components/note-card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  function onNoteCreated(content) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function onNoteDeleted(id) {
    const notesArray = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function handleSearch(event) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  function handleFilter(event) {
    event.preventDefault();
  }

  return (
    <>
      <div className="h-screen flex flex-col gap-6 px-6 py-40 bg-stone-900 text-stone-200 lg:py-32 lg:px-40">
        <div className="fixed right-6 -top-6 w-full flex justify-end lg:relative">
          <Link
            href="/"
            className="w-20 bg-lime-400 text-stone-900 flex items-center justify-center gap-1 px-2 pb-2 pt-8 lg:pt-2 rounded-sm lg:bg-transparent lg:text-stone-200 hover:-transtone-y-1 duration-200 lg:hover:bg-lime-400 lg:hover:text-stone-900 lg:hover:border-lime-400"
          >
            Home <ArrowUpRight width={16} height={16} />
          </Link>
        </div>

        <div>
          <form onSubmit={handleFilter} className="w-full mb-6">
            <input
              type="text"
              placeholder="Busque em suas notas..."
              className="w-full bg-transparent text-3xl outline-none font-semibold placeholder:text-stone-500"
              onChange={handleSearch}
            />
          </form>

          <div className="h-px bg-stone-500"></div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] my-6 gap-6">
          <NewNoteCard onNoteCreated={onNoteCreated} />

          {filteredNotes.map((note) => {
            return (
              <NoteCard
                key={note.id}
                note={note}
                onNoteDeleted={onNoteDeleted}
              />
            );
          })}
        </div>
      </div>
      <Toaster richColors />
    </>
  );
}
