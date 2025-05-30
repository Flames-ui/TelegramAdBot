import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initially no user
  const [user, setUser] = useState(null);

  // Fake login function (replace with your API call)
  const login = (username) => {
    // Example user object returned by your API
    const loggedInUser = {
      id: 'user123',      // unique user id from your API
      name: username,
      role: username === 'admin' ? 'admin' : 'user' // simple example
    };
    setUser(loggedInUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
