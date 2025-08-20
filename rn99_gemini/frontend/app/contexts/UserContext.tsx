import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number | null;
  username: string | null;
  email: string | null;
  isAdmin: boolean;
}

interface UserContextType {
  user: User;
  login: (userData: Omit<User, 'isAdmin'> & { isAdmin?: boolean }) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: null,
    username: null,
    email: null,
    isAdmin: false,
  });

  const login = (userData: Omit<User, 'isAdmin'> & { isAdmin?: boolean }) => {
    setUser({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      isAdmin: userData.isAdmin || false,
    });
  };

  const logout = () => {
    setUser({
      id: null,
      username: null,
      email: null,
      isAdmin: false,
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// 기본 내보내기 추가
export default UserContext;
