import { defineStore } from "pinia"
import { useRuntimeConfig } from '#app'

import type { MovieList, Movie, ApiError, Genre } from '../types/movie'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    genres: [] as Genre[],
    autocompletes: [] as Movie[],
    favoriteMovies: [] as Movie[],
    totalFavoriteMovies: 0,
  }),
  actions: {
    getApiBase() {
        const config = useRuntimeConfig();
        return config.public.apiBase;
    },

    getApiKey() {
        const config = useRuntimeConfig();
        return config.public.apiKey;
    },

    getAccountId() {
        const config = useRuntimeConfig();
        return config.public.accountId;
    },

    getSessionId() {
        const config = useRuntimeConfig();
        return config.public.sessionId;
    },

    getGenres() {
      const apiBase = this.getApiBase();
      const apiKey = this.getApiKey();

      return $fetch<{ genres: Genre[] }>(`${apiBase}/genre/movie/list`, {
        query: { api_key: apiKey },
      })
        .then(response => {
          this.genres = response.genres;
        })
        .catch(error => {
          console.error('Error fetching genres:', error);
        });
    },
    getMovies(payload: any): Promise<MovieList> {
        const apiBase = this.getApiBase();
        const apiKey = this.getApiKey();

        return new Promise((resolve, reject) => {
          $fetch<MovieList>(`${apiBase}/discover/movie`, {
            query: {
                api_key: apiKey,
                ...payload
            }
          })
            .then(response => {
              resolve(response);
            })
            .catch((error: ApiError) => {
              console.error('Error fetching movies:', error);
              reject(error);
            });
        });
    },
    getMovieByQuery(payload: any): Promise<MovieList> {
        const apiBase = this.getApiBase();
        const apiKey = this.getApiKey();

        return new Promise((resolve, reject) => {
          $fetch<MovieList>(`${apiBase}/search/movie`, {
            query: {
                api_key: apiKey,
                ...payload
            }
          })
            .then(response => {
              this.autocompletes = response.results.slice(0, 5)
              resolve(response);
            })
            .catch((error: ApiError) => {
              console.error('Error fetching movies:', error);
              reject(error);
            });
        });
    },
    getTrendingMovies(): Promise<MovieList> {
        const apiBase = this.getApiBase();
        const apiKey = this.getApiKey();

        return new Promise((resolve, reject) => {
          $fetch<MovieList>(`${apiBase}/trending/movie/day`, {
            query: {
                api_key: apiKey
            }
          })
            .then(response => {
              resolve(response);
            })
            .catch((error: ApiError) => {
              console.error('Error fetching movies:', error);
              reject(error);
            });
        });
    },

    getMovieDetail(id: string): Promise<MovieList> {
      const apiBase = this.getApiBase();
      const apiKey = this.getApiKey();

      return new Promise((resolve, reject) => {
        $fetch<MovieList>(`${apiBase}/movie/${id}`, {
          query: {
            api_key: apiKey
          }
        })
          .then(response => {
            resolve(response);
          })
          .catch((error: ApiError) => {
            console.error('Error fetching movies:', error);
            reject(error);
          });
      });
    },

    getMovieReviews(id: string): Promise<MovieList> {
      const apiBase = this.getApiBase();
      const apiKey = this.getApiKey();

      return new Promise((resolve, reject) => {
        $fetch<MovieList>(`${apiBase}/movie/${id}/reviews`, {
          query: {
            api_key: apiKey
          }
        })
          .then(response => {
            resolve(response);
          })
          .catch((error: ApiError) => {
            console.error('Error fetching movies:', error);
            reject(error);
          });
      });
    },
    getFavorite(): Promise<MovieList> {
      const apiBase = this.getApiBase();
      const apiKey = this.getApiKey();
      const accountId = this.getAccountId();
      const sessionId = this.getSessionId();

      return new Promise((resolve, reject) => {
        $fetch<MovieList>(`${apiBase}/account/${accountId}/favorite/movies`, {
          query: {
            api_key: apiKey,
            language: 'en-US',
            sort_by: 'created_at.asc',
            session_id: sessionId
          }
        })
          .then(response => {
            this.totalFavoriteMovies = response.total_results
            resolve(response);
          })
          .catch((error: ApiError) => {
            console.error('Error fetching movies:', error);
            reject(error);
          });
      });
    },
    postFavorite(id: string | number) {
      const apiBase = this.getApiBase();
      const apiKey = this.getApiKey();
      const accountId = this.getAccountId();
      const sessionId = this.getSessionId();

      return new Promise((resolve, reject) => {
        $fetch(`${apiBase}/account/${accountId}/favorite`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          query: {
            api_key: apiKey,
            session_id: sessionId
          },
          body: JSON.stringify({
            media_type: "movie",
            media_id: id,
            favorite: true
          }),
        })
          .then(response => {
            resolve(response);
          })
          .catch((error: ApiError) => {
            console.error('Error fetching movies:', error);
            reject(error);
          });
      });
    }
  }
})