// import {createContext, ReactNode, useContext, useState} from 'react';

// // types
// // [NOTE] this may change when start implementing OAuth
// import {SimpleUser} from '@/types/user';

// export const UserContext = createContext<{
//   user: SimpleUser | undefined;
//   setUser: (user: SimpleUser) => void;
// }>({
//   user: undefined,
//   setUser: () => {},
// });

// export const UserProvider = ({children}: {children: ReactNode}) => {
//   const [user, setUser] = useState<SimpleUser | undefined>(undefined);

//   return (
//     <UserContext.Provider value={{user, setUser}}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom Hook
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// types
import {SimpleUser} from '@/types/user';

export const UserContext = createContext<{
  user: SimpleUser | undefined;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}>({
  user: undefined,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<SimpleUser | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(
      (firebaseUser: FirebaseAuthTypes.User | null) => {
        if (firebaseUser) {
          setUser({
            email: firebaseUser.email || '',
            fullname: firebaseUser.displayName || '',
            major: '',
            gradYear: new Date().getFullYear(),
            linkedin: '',
          });
        } else {
          setUser(undefined);
        }
      },
    );

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (!userInfo.data?.idToken) {
        throw new Error('Google Sign-In failed: No ID Token returned');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.data.idToken,
      );
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      setUser(undefined);
    } catch (error) {
      console.error('Sign-Out Error:', error);
    }
  };

  return (
    <UserContext.Provider value={{user, signInWithGoogle, signOut}}>
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
