interface AccessTokenResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export const requestAccessToken = async (
  code: string
): Promise<AccessTokenResponse> => {
  const codeVerifier = localStorage.getItem('code_verifier');

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI as string,
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID as string,
    code_verifier: codeVerifier as string
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  if (!response.ok) {
    throw new Error('Request access token failed)');
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token, expires_in, refresh_token } = await response.json();

  return {
    accessToken: access_token,
    refreshToken: refresh_token,
    expiresIn: expires_in
  };
};
