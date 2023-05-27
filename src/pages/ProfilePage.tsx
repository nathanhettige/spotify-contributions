import { Navbar } from '@theme/components';
import useSpotifyAuth from '../api/SpotifyAuth/useSpotifyAuth';
import { useProfile } from '../api/SpotifyHooks/useProfile';

// TODO remove query params from this page

function ProfilePage() {
  const { accessToken } = useSpotifyAuth();
  const { data: profile } = useProfile(accessToken);

  // const { data: playlists } = useUsersPlaylists(
  //   accessToken,
  //   profile?.id as string,
  //   !(profile == null)
  // );

  return (
    <>
      <Navbar />
      <div className="mx-4 py-4">
        <section className="flex">
          <div className="avatar mr-6 w-24">
            <div className="text-neutral-content bg-disabled w-full rounded-full ring ring-[rgb(207,215,222)]">
              <img alt="Profile" src={profile?.images[0]?.url} />
            </div>
          </div>
          <div className="flex flex-col justify-center py-4">
            <h6>{profile?.display_name}</h6>
            <p className="text-sm font-light">
              {profile?.followers.total} Followers
            </p>
          </div>
        </section>

        <div className="divider"></div>

        <section>
          <p>Pinned</p>
        </section>

        <div className="divider"></div>

        <section>
          <p>387 contributions in the last year</p>
          <div id="cal-heatmap"></div>
        </section>
      </div>
    </>
  );
}

export default ProfilePage;
