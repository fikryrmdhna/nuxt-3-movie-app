import { defineStore } from "pinia"
import { useRuntimeConfig } from '#app'

import type { FetchResponse, ApiError } from "../types/movie";

export const useAuthStore = defineStore('auth', {
  state: () => ({
        sessionId: null as string | null
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
    initializeSession() {
        if (typeof window !== 'undefined') {
            this.sessionId = sessionStorage.getItem('session_id') || null;
        }
    },
    async checkSession() {
        await this.initializeSession()

        if (this.sessionId) {
          console.log('Session exists:', this.sessionId);
          return;
        }
  
        console.log('Fetching new token');
        await this.getRequestToken();
      },
  
      async getRequestToken() {
        const apiBase = this.getApiBase();
        const apiKey = this.getApiKey();

        return new Promise((resolve, reject) => {
            $fetch<FetchResponse>(`${apiBase}/authentication/token/new`, {
                query: {
                    api_key: apiKey
                }
            })
            .then(async (response) => {
                console.log('Request Token:', response.request_token);
          
                await this.createSession(response.request_token);
                resolve(response);
            })
            .catch((error: ApiError) => {
                console.error('Error fetching request token:', error);
                reject(error);
            });
        });
      },
  
      async createSession(requestToken: string) {
        const apiBase = this.getApiBase();
        const apiKey = this.getApiKey();

        return new Promise((resolve, reject) => {
            $fetch<FetchResponse>(`${apiBase}/authentication/session/new`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                query: {
                    api_key: apiKey,
                },
                body: JSON.stringify({ request_token: requestToken })
            })
            .then(async (response) => {
                this.sessionId = response.session_id;
                sessionStorage.setItem('session_id', this.sessionId);
        
                console.log('New Session ID:', this.sessionId);
                resolve(response);
            })
            .catch((error: ApiError) => {
                console.error('Error creating session:', error);
                reject(error);
            });
        });
      }
  }
})