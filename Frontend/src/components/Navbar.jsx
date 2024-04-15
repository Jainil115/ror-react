import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/CS.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button } from "monday-ui-react-core";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated } =
    useAuth0();

  const { myUser } = useContext(UserContext);

  if (!myUser) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(user);
  console.log(myUser);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <nav className="bg-white shadow-lg p-5 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/dashboard" className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
          <span className="text-gray-800 font-bold text-l">
            Customer <br />
            Support
          </span>
        </Link>
      </div>

      <div className="flex items-center justify-center flex-grow">
        <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none text-gray-800 w-full"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          ></svg>

          <button className="flex items-center bg-gray-300 rounded-full px-2 py-2 hover:bg-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-800"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>

      {/* <Button
        onClick={() =>
          isAuthenticated
            ? logout({ returnTo: window.location.origin })
            : loginWithRedirect()
        }
        className="bg-blue-500 text-white px-4 py-2 text-lg font-bold rounded"
      >
        {isAuthenticated ? "Logout" : "Login"}
      </Button>
      {isAuthenticated && user && (
        <div className="flex gap-4 mr-10">
          <Avatar
            ariaLabel={user?.name}
            size="large"
            src={
              user?.picture ||
              "https://style.monday.com/static/media/person1.de30c8ee.png"
            }
            type="img"
          />
          <div className="flex flex-col">
            <div>{user?.name.split("@")[0] || user?.email.split("@")[0]}</div>
            {/* <div>{myUser?.role || "User"}</div> */}
      {/* </div>
        </div>
      )} */}

      {isAuthenticated && user && (
        <div className="ml-auto flex items-center">
          <div className="flex items-center">
            <Avatar
              ariaLabel={user.name}
              size="large"
              src={user.picture}
              alt={user.name}
              type="img"
            />
            <div className="ml-3">
              <span className="text-gray-800 font-medium">{user.name}</span>
              <br />
              <span className="text-gray-600 text-sm">{myUser.role}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
