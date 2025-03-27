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
    GoogleSignin.configure({
      webClientId:
        '602978160198-tsvut54bce28nvlvvd0cm8feho3gapdm.apps.googleusercontent.com',
    });

    await GoogleSignin.hasPlayServices();
    const signInResult = await GoogleSignin.signIn();

    if (!signInResult.data?.idToken) {
      throw new Error('Google Sign-In failed: No ID Token returned');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(
      signInResult.data.idToken,
    );
    await auth().signInWithCredential(googleCredential);
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
