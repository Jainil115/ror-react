import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [myUser, setMyUser] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    console.log("User:", user);
    const fetchUser = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.get("/api/v1/users", {
            params: {
              email: user.email,
            },
          });
          const filteredUser = response.data.find(
            (userData) => userData.email === user.email
          );

          setMyUser(filteredUser);
          console.log("User fetched:", filteredUser);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [isAuthenticated, user]);

  return (
    <UserContext.Provider
      value={{
        myUser,
        setMyUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
