import { defineStore } from "pinia"
import { useRuntimeConfig } from '#app'

import type { MovieList, Movie, ApiError, Genre } from '../types/movie'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    genres: [] as Genre[],
    autocompletes: [] as Movie[]
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
              console.log('response', response)
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
    }
  }
})