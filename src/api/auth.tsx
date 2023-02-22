import { useEffect, useState } from 'react';

/**
 * PKCE for OAuth2.0
 */

export const useSpotifyLogin = () => {
  const [codeChallenge, setCodeChallenge] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const verifier = window.crypto.randomUUID(); // Compatability issues with older browsers

  useEffect(() => {
    generateCodeChallenge(verifier)
      .then(setCodeChallenge)
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const authQueryParams = new URLSearchParams({
    // TODO: state
    response_type: 'code',
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID as string,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge as string,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI as string
  });

  const redirectToLogin = () => {
    if (codeChallenge == null) {
      throw new Error('Check loading state before calling redirect f');
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?${authQueryParams.toString()}`;
    }
  };

  return { loading, redirectToLogin };
};

const base64URLEncode = (str: string) => {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

const generateCodeChallenge = async (codeVerifier: string) => {
  const digest = await window.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(codeVerifier)
  );

  return base64URLEncode(String.fromCharCode(...new Uint8Array(digest)));
};
