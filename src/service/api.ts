export type Interest = {
  id: string;
  title: string;
  description: string;
  media: string;
  mediaIcon: string;
  mediaMini: string;
  coords: [number, number, number];
};

export const fetchInterests = async (): Promise<Interest[]> => {
  const apiUrl = 'https://api.zapt.tech/v2/interests?placeId=-ltvysf4acgzdxdhf81y';
  const headers = {
    accept: 'application/json',
    'x-api-key': '26ee8805-55f8-484a-a229-59d813131484',
  };

  try {
    const response = await fetch(apiUrl, { method: 'GET', headers });

    if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`);

    const data = await response.json();

    if (Array.isArray(data)) return data as Interest[];

    if (data && typeof data === 'object') return Object.values(data) as Interest[];

    throw new Error('Unexpected data format');
  } catch (error) {
    console.error('Error fetching interests:', error);
    throw error;
  }
};
