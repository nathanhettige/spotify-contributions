import {
  type ReactNode,
  useState,
  createContext,
  useContext,
  useMemo
} from 'react';

interface ISpotifyAuthContext {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
}

const AuthContext = createContext<ISpotifyAuthContext>({
  accessToken: null,
  setAccessToken: (s) => {}
});

export function SpotifyAuthProvider({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const initialState = useMemo(
    () => ({
      accessToken,
      setAccessToken
    }),
    [accessToken]
  );

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
}

export default function useSpotifyAuth() {
  return useContext(AuthContext);
}
