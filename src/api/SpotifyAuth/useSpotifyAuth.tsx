import { type ReactNode, useState, createContext, useContext } from 'react';

interface ISpotifyAuthContext {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

const AuthContext = createContext<ISpotifyAuthContext>({
  accessToken: '',
  setAccessToken: (s) => {}
});

export function SpotifyAuthProvider({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const [accessToken, setAccessToken] = useState<string>('');

  const initialState = {
    accessToken,
    setAccessToken
  };

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
}

export default function useSpotifyAuth() {
  return useContext(AuthContext);
}
