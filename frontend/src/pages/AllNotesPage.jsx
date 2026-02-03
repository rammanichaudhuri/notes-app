import { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useSearchParams } from 'react-router-dom';
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { LoaderIcon, ArrowLeftIcon } from "lucide-react";

const AllNotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const search = searchParams !== null ? searchParams.get('search') : null;

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
            <div className="min-h-screen bg-[#f5f5f7] bg-cover bg-center">
                {/* <div className="flex justify-center pt-6">
          <h1 className="font-style text-lg text-[#434E78]">note taker</h1>
        </div> */}
                <Navbar />

                <div className="max-w-full mx-auto px-10 mt-6">
                    {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

                    <Link to={"/"} className="flex mb-4 gap-1 w-fit items-center text-[#434E78] font-style">
                        <ArrowLeftIcon className="size-5 text-[#434E78]" />
                        <span className="text-[#434E78] link-underline link-underline-black">Back to Notes</span>
                    </Link>

                    <div className="font-style text-black mb-6">
                        <h1 className="text-l font-style text-black">These are all of your notes!</h1>
                    </div>

                    <div className="pb-8">
                        {notes.length === 0 && <NotesNotFound />}

                        {search !== null && search.length > 0 && notes.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {notes.filter((item) => {
                                    if (item.title.includes(search)) { return item; }
                                }).map((note) => (
                                    <NoteCard key={note._id} note={note} setNotes={setNotes} />
                                ))}
                                {notes.filter((item) => {
                                    if (item.title.includes(search)) { return item; }
                                }).length === 0 ? <div className="font-style text-black">No notes matched your search!</div> : <></>}
                            </div>
                        )}

                        {(search === null || search.length === 0)  && notes.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {notes.map((note) => (
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
export default AllNotesPage;
