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
  try {
    const response = await fetch('https://api.zapt.tech/v2/interests?placeId=-ltvysf4acgzdxdhf81y', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-api-key': '26ee8805-55f8-484a-a229-59d813131484',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data as Interest[];
    }

    if (typeof data === 'object' && data !== null) {
      return Object.values(data) as Interest[];
    }

    throw new Error('Unexpected data format');

  } catch (error) {
    console.error('Error fetching interests:', error);
    throw error;
  }
};

