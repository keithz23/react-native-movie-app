export const TMDB_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_TMDB_API_URL,
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  if (!TMDB_CONFIG.API_KEY) {
    throw new Error(
      "TMDB API key is missing. Please check your environment variables."
    );
  }

  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movies: ${response.status} ${response.statusText} - ${endpoint}`
    );
  }

  const data = await response.json();

  return data.results;
};
