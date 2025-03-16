import {createContext, ReactNode, useContext, useState} from 'react';

// types
// [NOTE] this may change when start implementing OAuth
import {SimpleUser} from '@/types/user';

export const UserContext = createContext<{
  user: SimpleUser | undefined;
  setUser: (user: SimpleUser) => void;
}>({
  user: undefined,
  setUser: () => {},
});

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<SimpleUser | undefined>(undefined);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
