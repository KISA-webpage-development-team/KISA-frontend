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

// env
import {FIREBASE_CLIENT_ID} from '@env';

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

  GoogleSignin.configure({
    webClientId: FIREBASE_CLIENT_ID,
  });

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
