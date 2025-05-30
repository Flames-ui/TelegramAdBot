import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Mock login function
  const login = (email, password) => {
    // For now, just accept any email/password and "log in"
    setUser({ email });
    return true;
  };

  // Mock signup function
  const signup = (email, password) => {
    // Accept any signup info
    setUser({ email });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for consuming context
export function useAuth() {
  return useContext(AuthContext);
    
