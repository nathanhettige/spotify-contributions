import {
  type ReactNode,
  useState,
  createContext,
  useContext,
  useEffect
} from 'react';

interface ISpotifyAuthContext {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
}

const AuthContext = createContext<ISpotifyAuthContext>({
  accessToken: null,
  setAccessToken: () => {}
});

export function SpotifyAuthProvider({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const [accessToken, setAccessToken] = useState<null | string>(null);

  useEffect(() => {
    const tokenExpiry = Number.parseInt(
      localStorage.getItem('token_expiry') ?? '0'
    );

    if (tokenExpiry > Date.now())
      // TODO refresh token
      setAccessToken(localStorage.getItem('access_token'));
  }, []);

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
