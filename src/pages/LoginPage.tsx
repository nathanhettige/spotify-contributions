import { authRequestUrl } from '../api/auth';

function LoginPage() {
  return (
    <div className="flex h-screen">
      <a href={authRequestUrl} className="m-auto">
        <button className="text-md btn-primary btn">Login with Spotify</button>
      </a>
    </div>
  );
}

export default LoginPage;
