import { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { LoaderIcon } from "lucide-react";

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const {theme, changeTheme} = useContext(ThemeContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#222831] flex items-center justify-center">
            <LoaderIcon className="animate-spin size-10" />
          </div>
  }

  return (
    <div className="">
      <div className={`${theme === "dark" ? "dark" : ""} min-h-screen bg-[#f5f5f7] dark:bg-[#222831] bg-cover bg-center`}>
        {/* <div className="flex justify-center pt-6">
          <h1 className="font-style text-lg text-[#434E78]">note taker</h1>
        </div> */}
        <Navbar notes={notes}/>

        <div className="max-w-full mx-auto px-10 mt-6">
          {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
          <div className="font-style text-black mb-8">
            <h1 className="text-l font-style text-black">Hi! Welcome!</h1>
            <h1>This is notetaker, a space for reading and writing text which you can use as a blog, a pastebin, or a notepad.  </h1>
            <h2>You can view, edit, create or delete notes. You can also search or sort by category. </h2>
          </div>

          <div className="pb-8">
            <Link to={"/create"} className="flex gap-1 items-center w-fit justify-start bg-transparent font-style decoration-none">
              <PlusIcon className="size-5 text-[#434E78]" />
              <span className="text-[#434E78] link-underline link-underline-black">Create new note!</span>
            </Link>
          </div>

          <div className="pb-8">
            <h1 className="text-l font-style text-black mb-3">Some recent notes...</h1>
            {notes.length === 0 && <NotesNotFound />}
            {notes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {notes.slice(0, 8).map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
export default HomePage;
