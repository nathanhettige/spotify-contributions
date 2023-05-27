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
      <div className="mx-4">
        <section className="grid w-full grid-cols-[1fr,5fr] items-center">
          <div className="avatar w-full">
            <div className="text-neutral-content bg-disabled h-full w-full rounded-full ring ring-[rgb(207,215,222)]">
              <img alt="Profile" src={profile?.images[0]?.url} />
            </div>
          </div>
          <div className="ml-4 py-4">
            <p className="text-2xl font-semibold">{profile?.display_name}</p>
            <p className="text-info-content text-xl font-light">
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
