/**
 * PKCE for OAuth2.0
 */

function base64URLEncode(str: string) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function generateRandomString(length: number = 48) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const digest = await window.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(codeVerifier)
  );

  return base64URLEncode(String.fromCharCode(...new Uint8Array(digest)));
}

const verifier = generateRandomString();
const authEndpoint = 'https://accounts.spotify.com/authorize';
const authQueryParams = new URLSearchParams({
  // TODO: state
  response_type: 'code',
  client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID as string,
  code_challenge_method: 'S256',
  code_challenge: await generateCodeChallenge(verifier),
  redirect_uri: import.meta.env.VITE_REDIRECT_URI as string
});

export const authRequestUrl = `${authEndpoint}?${authQueryParams.toString()}`;
