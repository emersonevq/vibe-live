import React, { createContext, useContext, useState } from 'react';

import React, { createContext, useState, useContext } from 'react';

type AuthContextType = {
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setSignedIn] = useState(false);

  const signIn = async (email: string, password: string) => {
    // TODO: replace with real auth call
    // simple validation
    if (!email || !password) throw new Error('Missing credentials');
    setSignedIn(true);
  };

  const signUp = async (email: string, password: string) => {
    // TODO: replace with real signup
    if (!email || !password) throw new Error('Missing credentials');
    setSignedIn(true);
  };

  const signOut = () => setSignedIn(false);

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
