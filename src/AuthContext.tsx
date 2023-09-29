import React, { createContext, useState, useContext, ReactNode } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  AuthUsername: string;
  AuthLogin: (user:string, accesstoken :string) => void;
  logout: () => void;
};

const initialAuthContext: AuthContextType = {
  isLoggedIn: false,
  AuthUsername: '',
  AuthLogin: (user : string, accesstoken :string) => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [AuthUsername, setUsername] = useState(localStorage.getItem('AuthUsername') || '');

  const AuthLogin = (user : string, accesstoken :string) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('AuthUsername', user);
    setUsername(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('AuthUsername');
    setUsername('');
    setIsLoggedIn(false);
  };

  const authContextValue: AuthContextType = {
    isLoggedIn,
    AuthUsername,
    AuthLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};