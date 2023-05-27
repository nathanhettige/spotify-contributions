import { Navbar } from '@theme/components';
import useSpotifyAuth from '../api/SpotifyAuth/useSpotifyAuth';
import { useProfile } from '../api/SpotifyHooks/useProfile';

function ProfilePage() {
  const { accessToken } = useSpotifyAuth();
  // Probably need to remove query params from this page
  const { data: profile } = useProfile(accessToken);
  // const { data: playlists } = useUsersPlaylists(
  //   accessToken,
  //   profile?.id as string,
  //   !(profile == null)
  // );

  return (
    <>
      <Navbar />
      <section className="mx-4 py-4">
        <div className="flex">
          <div className="avatar mr-6 w-24">
            <div className="bg-neutral-focus text-neutral-content w-full rounded-full ring ring-[rgb(207,215,222)]">
              <img alt="Profile" src={profile?.images[0]?.url} />
            </div>
          </div>
          <div className="flex flex-col justify-center py-4">
            <h6>{profile?.display_name}</h6>
            <p className="text-sm font-light">
              {profile?.followers.total} Followers
            </p>
          </div>
        </div>
        <div className="divider"></div>
      </section>
    </>
  );
}

export default ProfilePage;
