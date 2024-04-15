import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
 // Make sure to import the UserContext from the correct file

function MyComponent() {
  // Access the user context
  const { myUser } = useContext(UserContext);

  return (
    <div>
      {myUser ? (
        <div>
          <p>Name: {myUser.name}</p>
          <p>Email: {myUser.email}</p>
          <p>Role: {myUser.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;
