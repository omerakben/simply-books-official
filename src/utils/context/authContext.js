// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

'use client';

import { app } from '@/utils/client';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();
const auth = getAuth(app);

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser(fbUser);
      } else {
        setUser(false);
      }
    }); // creates a single global listener for auth state changed
    return () => unsubscribe();
  }, []);

  const value = useMemo(
    // https://reactjs.org/docs/hooks-reference.html#usememo
    () => ({
      user,
      userLoading: user === null,
      // as long as user === null, will be true
      // As soon as the user value !== null, value will be false
    }),
    [user],
  );

  return <AuthContext.Provider value={value} {...props} />;
}
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthConsumer, AuthProvider, useAuth };
