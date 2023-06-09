import { useEffect, useState } from 'react';
import { requestUserAuthorization } from './requestUserAuthorization';
import { requestAccessToken } from './requestAccessToken';
import useAuth from './useSpotifyAuth';

// TODO Refresh tokens and handle refresh with code already in path params

/**
 * PKCE for OAuth2.0
 */
export const useSpotifyLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAccessToken, accessToken } = useAuth();

  useEffect(() => {
    // Request access token if authorization code in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('code_verifier') as string;

    if (code !== null && codeVerifier !== null) {
      setLoading(true);
      void requestAccessToken(code).then(
        ({ accessToken, expiresIn, refreshToken }) => {
          // Update state
          setAccessToken(accessToken);
          // Store tokens in local storage
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem(
            'token_expiry',
            (Date.now() + expiresIn * 1000).toString()
          );
          localStorage.setItem('refresh_token', refreshToken);
        }
      );
    }
  }, [setAccessToken, accessToken]);

  const redirectToLogin = (): void => {
    // Gets and sets code verifier in local storage
    requestUserAuthorization().catch(console.error);
  };

  return { loading, redirectToLogin };
};
