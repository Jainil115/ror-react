import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigation = useNavigate();
  const { loginWithRedirect, user, isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      // If user is authenticated, send user data to the backend
      saveUserData(user);
      navigation("/dashboard");
    }
  }, [isAuthenticated, navigation, user]);

  const saveUserData = async (userData) => {
    try {
      // Send user data to the backend
      await axios.post("/api/v1/users", {
        name: userData.name,
        email: userData.email,
        // Include any additional user data you want to save
      });
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Our Customer Success Platform
      </h1>
      <p className="text-lg text-center mb-8">
        Our platform automates the process of notifying stakeholders about any
        updates or changes within our system, enhancing communication and
        transparency.
      </p>
      <p className="text-lg text-center mb-8">
        Please log in to access the platform's features.
      </p>
      <button
        className="bg-white text-blue-500 font-bold py-3 px-10 rounded hover:bg-blue-600 hover:text-white transition duration-300"
        onClick={handleLogin}
      >
        Log In
      </button>
    </div>
  );
};

export default Home;
