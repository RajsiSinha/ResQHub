import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#0b1c2d] text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          ResQHub
        </Link>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link to="/login" className="hover:text-blue-400 transition">
            Login
          </Link>
          <Link to="/register" className="hover:text-blue-400 transition">
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}
