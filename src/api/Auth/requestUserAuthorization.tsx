export const requestUserAuthorization = async () => {
  const codeVerifier = window.crypto.randomUUID() + window.crypto.randomUUID(); // Compatability issues with older browsers
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  localStorage.setItem('code_verifier', codeVerifier);
  console.log(codeVerifier);

  // Redirect to Spotify login
  window.location.href = `https://accounts.spotify.com/authorize?${getCodeChallengeQueryParams(
    codeChallenge
  )}`;
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

const getCodeChallengeQueryParams = (codeChallenge: string): string =>
  new URLSearchParams({
    // TODO: state
    response_type: 'code',
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID as string,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI as string
  }).toString();
