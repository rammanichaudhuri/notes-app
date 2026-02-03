import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const {theme, changeTheme} = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${theme === "dark" ? "dark" : ""} min-h-screen bg-[#f5f5f7] dark:bg-[#222831]`}>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto font-style">
          <Link to={"/"} className="flex mb-4 gap-1 items-center w-fit">
            <ArrowLeftIcon className="size-5 text-[#434E78]" />
            <span className="text-[#434E78] link-underline link-underline-black">Back to Notes</span>
          </Link>

          <div className="card bg-[#222831] font-inter">
            <div className="card-body">
              <h2 className="card-title mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="This is your title!"
                    className="input input-bordered bg-[#DDE6ED] text-sm text-[#434E78]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-80 bg-[#DDE6ED] text-[#434E78]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn bg-[#DDE6ED] font-style text-[#434E78]" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
