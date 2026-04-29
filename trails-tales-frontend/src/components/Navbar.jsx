import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b
                    bg-white dark:bg-gray-900 
                    text-black dark:text-white">
      
      <Link to="/" className="text-xl font-bold">
        Trails&Tales
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/create">Create</Link>
      </div>
    </nav>
  );
}
