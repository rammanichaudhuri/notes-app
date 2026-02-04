import { Link, useNavigate } from "react-router";
import { PlusIcon, Moon, ArrowDownUp, Search, NotebookPen, Sun, CornerDownRight } from "lucide-react";
import { useContext, useState } from 'react';
import { ThemeContext } from "../context/ThemeContext";

const Navbar = ({ notes }) => {
  const { theme, changeTheme } = useContext(ThemeContext);

  const [searchVal, setSearchVal] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
  }

  function handleSearchClick(event) {
    console.log(event);
    navigate(`/notes?search=${searchVal}`);
    event.preventDefault();
  }

  return (
    <header className="bg-[#f5f5f7] px-10 py-8 border-solid border-b border-x-0 border-t-0 border-[#00000033] border-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        <div className="flex col-span-2 items-center justify-between">
          <Link to={"/"}>
            <h1 className="text-lg font-style font-[5000] text-black">Note taker / Home</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <div className="flex items-center gap-4 justify-center">
            {
              theme === "dark" ?
                <button className="flex gap-1 font-style items-center" onClick={changeTheme}>
                  <Sun className="size-5 text-[#434E78]" />
                  <span className="text-[#434E78] link-underline link-underline-black">Change mode</span>
                </button> :
                <button className="flex gap-1 font-style items-center" onClick={changeTheme}>
                  <Moon className="size-5 text-[#434E78]" />
                  <span className="text-[#434E78] link-underline link-underline-black">Change mode</span>
                </button>
            }
          </div>
          <div className="flex items-center gap-4 justify-center">
            <Link to={`/notes`} className="flex gap-1 items-center justify-between bg-transparent font-style">
              <NotebookPen className="size-5 text-[#434E78]" />
              <span className="text-[#434E78] link-underline link-underline-black">All notes</span>
            </Link>
          </div>
          <div className="flex gap-1 items-center justify-start bg-transparent font-style">
            <form class="max-w-md mx-auto bg-white" onSubmit={handleSubmit}>
              <label for="search" class="block mb-2.5 text-sm font-medium text-heading sr-only">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                </div>
                <input type="search" id="search" class="block w-full p-3 ps-9 bg-[#222831] border border-default-medium text-heading text-sm rounded-base rounded-md focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" onChange={e => setSearchVal(e.target.value)} onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }} required />
                <button type="button" class="absolute end-1.5 bottom-1.5 font-inter text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none" onClick={handleSearchClick}>
                  <CornerDownRight className="size-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header >
  );
};
export default Navbar;
