import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext object
const AuthContext = createContext(null);

// Provider component to wrap around your app
export function AuthProvider({ children }) {
  // State to hold the user object (null if not logged in)
  const [user, setUser] = useState(null);

  // Function to log in a user (fake login)
  const login = (username) => {
    setUser({ name: username });
  };

  // Function to log out
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext in other components easily
export function useAuth() {
  return useContext(AuthContext);
}
