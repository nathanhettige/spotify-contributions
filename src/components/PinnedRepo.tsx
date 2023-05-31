import { type Playlist } from '../api/SpotifyHooks/useUsersPlaylists';

interface PinnedRepoProps {
  playlist: Playlist;
  //   followers: number; not in get user playlist query
}

export const PinnedRepo = (props: PinnedRepoProps) => {
  const { playlist } = props;
  return (
    <div className="space-y-1 rounded-md border-2  p-4">
      <div className="flex flex-row items-center">
        <i className="ri-music-2-line pr-2"></i>
        <a
          href={playlist.external_urls.spotify}
          className="text-accent text-sm font-semibold hover:underline"
        >
          {playlist.name}
        </a>
      </div>
      <div className="text-info-content text-sm">{playlist.description}</div>
      <div className="text-info-content flex  flex-row items-center text-sm">
        <div className="mr-1 h-3 w-3 rounded-full bg-blue-400" />
        Playlist
      </div>
    </div>
  );
};
