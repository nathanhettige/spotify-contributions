import useSpotifyAuth from '../api/SpotifyAuth/useSpotifyAuth';
import { useProfile } from '../api/useProfile';

function ProfilePage() {
  const { accessToken } = useSpotifyAuth();
  // Probably need to remove query params from this page
  const { data } = useProfile(accessToken);

  return (
    <div className="flex flex-col">
      <img
        style={{ width: '100px' }}
        alt="Profile"
        src={data?.images[0]?.url}
      />
      <div>Welcome {data?.display_name}</div>
      <div>Followers: {data?.followers.total}</div>
    </div>
  );
}

export default ProfilePage;
