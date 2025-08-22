// React에서 필요한 함수/타입들을 import 합니다.
import React, { createContext, useContext, ReactNode, useState } from 'react';

// ==============================
// 사용자 정보 타입 정의
// ==============================

// User 객체의 타입을 정의합니다.
interface User {
  email: string | null;   // 사용자 이메일
  name: string | null;    // 사용자 이름
  phone: string | null;   // 사용자 전화번호
  isLoggedIn: boolean;        // 로그인 여부
}

// Context 안에서 사용할 함수와 값들의 타입을 정의합니다.
interface UserContextType {
  user: User;                                          // 현재 사용자 정보
  login: (userData: Omit<User, 'isLoggedIn'>) => void; // 로그인 함수 (isLoggedIn은 자동 처리)
  logout: () => void;                                  // 로그아웃 함수
}

// ==============================
// Context 생성
// ==============================

// UserContext를 생성합니다.
// 초기값은 undefined로 설정하고, 실제 사용할 때 반드시 Provider로 감싸야 함을 의미합니다.
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider 컴포넌트는 App 전체를 감싸 사용자 정보를 하위 컴포넌트에 전달해줍니다.
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // user라는 상태를 생성합니다. 초기값은 로그인되지 않은 상태입니다.
  const [user, setUser] = useState<User>({
    email: null,
    name: null,
    phone: null,
    isLoggedIn: false,
  });

    // 로그인 함수
  // 매개변수로 전달된 userData로 사용자 정보를 설정하고, isLoggedIn을 true로 설정합니다.
  //  Omit<User, 'isLoggedIn'> : User 타입에서 'isLoggedIn' 속성만 빼고 나머지를 사용하
  const login = (userData: Omit<User, 'isLoggedIn'>) => {
    setUser({
      ...userData,
      isLoggedIn: true,
    });
  };

  // 로그아웃 함수
  // user 상태를 초기값으로 되돌려 로그아웃 처리합니다.
  const logout = () => {
    setUser({
      email: null,
      name: null,
      phone: null,
      isLoggedIn: false,
    });
  };

  // 하위 컴포넌트들이 context를 사용할 수 있도록 Provider로 감쌉니다.
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ==============================
// Custom Hook: useUser()
// ==============================

// 이 커스텀 훅을 사용하면 더 간단하게 context에 접근할 수 있습니다.
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  // 만약 Provider 안이 아닌 곳에서 이 훅을 사용하면 에러를 발생시킵니다.
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};