export const requestAccessToken = async (code: string) => {
  // const existingToken = localStorage.getItem('access_token');

  const codeVerifier = localStorage.getItem('code_verifier');

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI as string,
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID as string,
    code_verifier: codeVerifier as string
  });

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      return await response.json();
    })
    .then((data) => {
      localStorage.setItem('access_token', data.access_token);
      // Need to deal with refresh tokens
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
