import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-6 max-w-md mx-auto text-center">
      <div className="">
        <NotebookIcon className="size-6 text-[#434E78]" />
      </div>
      <h3 className="text-2xl font-bold text-[#434E78] font-style">No notes yet</h3>
      <p className="text-[#434E78] font-style text-sm">
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>
    </div>
  );
};
export default NotesNotFound;
