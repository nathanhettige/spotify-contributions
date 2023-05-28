import { useQuery } from 'react-query';

interface Playlists {
  total: number;
  items: Playlist[];
}

export interface ExternalUrl {
  spotify: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Tracks;
  description: string;
  external_urls: ExternalUrl;
}

interface Tracks {
  href: string;
  total: number;
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
    queryKey: ['usersPlaylists', userId, token],
    queryFn: async () => await fetchUsersPlaylists(token, userId),
    enabled
  });
