import { useQuery } from 'react-query';

async function fetchCheckIfUsersFollowPlaylist(
  token: string,
  playlistId: string,
  userId: string
): Promise<boolean[]> {
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?${new URLSearchParams(
      {
        ids: userId
      }
    ).toString()}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return await result.json();
}

export const useCheckIfUsersFollowPlaylist = (
  token: string,
  playlistId: string,
  userId: string,
  enabled: boolean
) =>
  useQuery({
    queryKey: ['CheckIfUsersFollowPlaylist', token],
    queryFn: async () =>
      await fetchCheckIfUsersFollowPlaylist(token, playlistId, userId),
    enabled
  });
