import { useQuery } from 'react-query';

async function fetchProfile(token: string): Promise<object> {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

const useProfile = (token: string) =>
  useQuery({
    queryKey: ['profile', token],
    queryFn: async () => await fetchProfile(token)
  });
