function LoginPage() {
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const responseType = 'token';
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI as string;

  const authRequestUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;

  console.log(import.meta.env);
  return (
    <div className="flex h-screen">
      <button className="text-md btn-primary btn m-auto">
        <a href={authRequestUrl}>Login with Spotify</a>
      </button>
    </div>
  );
}

export default LoginPage;
