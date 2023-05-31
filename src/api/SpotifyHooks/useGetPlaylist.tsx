import { useQueries, useQuery } from 'react-query';

interface Playlist {
  id: string;
  name: string;
  followers: Followers;
}

interface Followers {
  total: number;
}

export async function getPlaylist(
  token: string,
  playlistId: string
): Promise<Playlist> {
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return await result.json();
}

export const useGetPlaylist = (
  token: string,
  playlistId: string,
  enabled: boolean
) =>
  useQuery({
    queryKey: ['getPlaylist', playlistId],
    queryFn: async () => await getPlaylist(token, playlistId),
    enabled
  });

export const useGetPlaylists = (
  playlistIds: string[],
  accessToken: string,
  enabled: boolean
) =>
  useQueries(
    playlistIds.map((id) => {
      return {
        queryKey: ['getPlaylist', id],
        queryFn: async () => await getPlaylist(accessToken, id),
        enabled
      };
    })
  );
