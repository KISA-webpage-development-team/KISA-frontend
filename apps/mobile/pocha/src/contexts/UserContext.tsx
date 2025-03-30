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
import {getUser} from '@/shared/apis/users/queries';
import {saveToken} from '@/shared/lib/react-native-keychain/keychain';
import signToken from '@/shared/lib/jsonwebtoken/signToken';

type SignInResult = {
  success: boolean;
  redirect: 'signup' | '';
};

export const UserContext = createContext<{
  user: SimpleUser | undefined;
  signInWithGoogle: () => Promise<SignInResult>;
  signOut: () => Promise<void>;
}>({
  user: undefined,
  signInWithGoogle: async () => ({success: false, redirect: ''}),
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

  const signInWithGoogle = async (): Promise<SignInResult> => {
    await GoogleSignin.hasPlayServices();
    const signInResult = await GoogleSignin.signIn();
    console.log('signInResult.data: ', signInResult.data);

    const idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error('Google Sign-In failed: No ID Token returned');
    }

    const email = signInResult.data?.user.email;

    if (!email) {
      throw new Error('Google Sign-In failed: No Email returned');
    }

    const token = await signToken(email);
    // Check if user already exists in the database
    const existingUser = await getUser(email, token);

    if (!existingUser) {
      console.warn('User does not exist in the database');
      return {success: false, redirect: 'signup'};
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    try {
      await auth().signInWithCredential(googleCredential);

      // save token to mobile keychain
      await saveToken(token);
      console.log('Token saved to keychain for user:', email);

      // TODO: continue here...
      return {success: true, redirect: ''};
    } catch (error) {
      console.error('Sign-In Error:', error);
      return {success: false, redirect: ''};
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
