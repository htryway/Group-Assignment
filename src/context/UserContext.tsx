import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextValue {
  name: string;
  username: string;
  avatarUri: string | null;
  setName: (v: string) => void;
  setUsername: (v: string) => void;
  setAvatarUri: (v: string | null) => void;
}

// Populated on the login/signup screen, then read anywhere in the app
// (Home greeting, Profile header, etc.) via useUser(). Like BookingContext,
// this resets on app restart — there's no backend here to persist it to.
const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ name, username, avatarUri, setName, setUsername, setAvatarUri }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
