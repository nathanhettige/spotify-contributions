import { useEffect, useState } from 'react';
import { requestUserAuthorization } from './requestUserAuthorization';
import { requestAccessToken } from './requestAccessToken';

/**
 * PKCE for OAuth2.0
 */
export const useSpotifyLogin = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Request access token if authorization code in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('code_verifier') as string;

    if (code !== null && codeVerifier !== null) {
      setLoading(true);
      requestAccessToken(code).catch(console.error);
    }
  }, []);

  const redirectToLogin = () => {
    requestUserAuthorization().catch(console.error);
  };

  return { loading, redirectToLogin };
};
