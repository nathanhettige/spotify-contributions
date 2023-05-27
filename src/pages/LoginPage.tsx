import { useSpotifyLogin } from '../api/SpotifyAuth/useSpotifyLogin';

function LoginPage() {
  const { loading, redirectToLogin } = useSpotifyLogin();

  return (
    <div className="flex h-screen">
      <button
        disabled={loading}
        onClick={redirectToLogin}
        className="text-md btn-primary btn m-auto"
      >
        Login with Spotify
      </button>
    </div>
  );
}

export default LoginPage;
