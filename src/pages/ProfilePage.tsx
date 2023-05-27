import useSpotifyAuth from '../api/SpotifyAuth/useSpotifyAuth';
import { useCheckIfUsersFollowPlaylist } from '../api/useCheckIfUsersFollowPlaylist';
import { useProfile } from '../api/useProfile';
import { useUsersPlaylists } from '../api/useUsersPlaylists';

function ProfilePage() {
  const { accessToken } = useSpotifyAuth();
  // Probably need to remove query params from this page
  const { data: profile } = useProfile(accessToken);
  const { data: torah } = useCheckIfUsersFollowPlaylist(
    accessToken,
    '3tOMuxiqokF0VLg0B6lbAU',
    profile?.id as string,
    !(profile == null)
  );
  const { data: playlists } = useUsersPlaylists(
    accessToken,
    profile?.id as string,
    !(profile == null)
  );

  return (
    <div className="flex flex-col">
      <img
        style={{ width: '100px' }}
        alt="Profile"
        src={profile?.images[0]?.url}
      />
      <div>Welcome {profile?.display_name}</div>
      <div>Followers: {profile?.followers.total}</div>
      <div>Do you follow Torah: {torah?.[0].toString()}</div>
      <div>Playlists count: {playlists?.total}</div>
    </div>
  );
}

export default ProfilePage;
