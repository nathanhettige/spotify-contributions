import { useSpotifyLogin } from '../api/SpotifyAuth/useSpotifyLogin';

function LoginPage() {
  const { redirectToLogin } = useSpotifyLogin();

  return (
    <div className="flex h-screen">
      <button
        onClick={redirectToLogin}
        className="text-md btn-primary btn text-neutral m-auto"
      >
        Login with Spotify
      </button>
    </div>
  );
}

export default LoginPage;
