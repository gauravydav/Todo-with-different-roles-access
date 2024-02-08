import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/authSlice";

import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10 shadow-lg">
      <Link to="/todo" className="text-2xl font-bold">
        Todo App
      </Link>

      <div className="flex items-center space-x-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
