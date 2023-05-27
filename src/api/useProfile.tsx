import { useQuery } from 'react-query';

interface Profile {
  display_name: string;
  followers: Follower;
  images: Image[];
}

interface Follower {
  href: string;
  total: number;
}

interface Image {
  url: string;
}

async function fetchProfile(token: string): Promise<Profile> {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

export const useProfile = (token: string) =>
  useQuery({
    queryKey: ['profile', token],
    queryFn: async () => await fetchProfile(token)
  });
