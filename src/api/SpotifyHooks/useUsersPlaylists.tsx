import { useQuery } from 'react-query';

interface Playlists {
  total: number;
  items: Playlist[];
}

interface Playlist {
  name: string;
}

async function fetchUsersPlaylists(
  token: string,
  userId: string
): Promise<Playlists> {
  const result = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return await result.json();
}

export const useUsersPlaylists = (
  token: string,
  userId: string,
  enabled: boolean
) =>
  useQuery({
    queryKey: ['usersPlylists', userId, token],
    queryFn: async () => await fetchUsersPlaylists(token, userId),
    enabled
  });
