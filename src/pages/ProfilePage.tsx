import { Navbar } from '@theme/components';
import useSpotifyAuth from '../api/SpotifyAuth/useSpotifyAuth';
import { useProfile } from '../api/SpotifyHooks/useProfile';
import { useUsersPlaylists } from '../api/SpotifyHooks/useUsersPlaylists';
import { PinnedRepo } from '@ui/PinnedRepo';

// TODO remove query params from this page

function ProfilePage() {
  const { accessToken } = useSpotifyAuth();
  const { data: profile, isSuccess } = useProfile(accessToken!);
  const { data: playlists } = useUsersPlaylists(
    accessToken!,
    profile?.id as string,
    isSuccess
  );

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
            <p className="text-primary-content text-2xl font-semibold">
              {profile?.display_name}
            </p>
            <p className="text-info-content text-xl font-light">
              {profile?.followers.total} Followers
            </p>
          </div>
        </section>

        <div className="divider"></div>

        <section>
          <p className="text-primary-content mb-2">Pinned</p>
          <div className="space-y-3">
            {playlists?.items
              .sort((x, y) => y.tracks.total - x.tracks.total)
              .slice(0, 6)
              .map((i) => {
                return <PinnedRepo key={i.id} playlist={i} />;
              })}
          </div>
        </section>

        <div className="divider"></div>

        <section>
          <p className="text-primary-content">
            387 contributions in the last year
          </p>
          <div id="cal-heatmap"></div>
        </section>
      </div>
    </>
  );
}

export default ProfilePage;
