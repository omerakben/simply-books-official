import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const auth = getAuth();

const signIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const signOutUser = () =>
  new Promise((resolve, reject) => {
    signOut(auth).then(resolve).catch(reject);
  });

export { signIn, signOutUser };
