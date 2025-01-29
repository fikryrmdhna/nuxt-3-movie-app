<template>
    <div>
        <section>
            <v-container-fluid>
                <v-row class="backdrop-image">
                    <v-col cols="12">
                        <div v-if="detail" class="image relative">
                            <NuxtImg
                                :src="detail.movie.backdrop_path ? `http://image.tmdb.org/t/p/w500/${detail.movie.backdrop_path}` : 'https://placehold.co/1600x600'"
                                :alt="detail.movie.title" 
                                class="img-fluid relative"
                                format="webp"
                                loading="lazy"
                                fit="cover" 
                            />
                        </div>
                    </v-col>
                </v-row>
            </v-container-fluid>
        </section>
        <section class="-mt-[30rem] sm:-mt-60 bg-[#1E232B] lg:bg-transparent">
            <v-container>
                <v-row v-if="detail?.movie" class="movie-detail relative z-10">
                    <v-col cols="8" md="2" lg="3">
                        <NuxtImg
                            :src="detail.movie.poster_path ? `http://image.tmdb.org/t/p/w500/${detail.movie.poster_path}` : 'https://placehold.co/250x375'"
                            :alt="detail.movie.title" 
                            class="img-fluid"
                            format="webp"
                            loading="lazy"
                            fit="cover" 
                        />
                    </v-col>
                    <v-col cols="12" md="10" lg="9" class="pt-4 pb-10 sm:py-10">
                        <MovieDetailCard :detail="detail" />
                    </v-col>
                </v-row>
            </v-container>
        </section>
        <section>
            <v-container>
                <v-row v-if="detail" class="pt-4 pb-16 relative z-1 movie-reviews">
                    <v-col cols="12" class="z-10">
                        <div class="text-[#FF0000] font-semibold uppercase mb-3">
                            Reviews
                        </div>
                    </v-col>
                    <template v-if="detail.reviews.length > 0">
                        <v-col v-for="review in detail?.reviews" :key="review.id" cols="12" sm="6" class="relative z-10">
                            <ReviewCard :review="review" />
                        </v-col>
                    </template>
                    <template v-else>
                        <h4 class="text-xl px-3 font-semibold">This film has no reviews</h4>
                    </template>
                </v-row>
            </v-container>
        </section>
        <section v-if="similarMovies.length > 0" class="bg-[#1E232B]">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <h2 class="text-white text-xl mb-6">
                            RECOMMENDATION MOVIES
                        </h2>
                        <MovieCard v-if="similarMovies" :movies="similarMovies" :className="'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-3'" />
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useMovieStore } from '@/stores/movie';
import type { MovieDetail, Movie, MovieList, ReviewList } from '../../types/movie';

import MovieCard from '../../components/Base/MovieCard.vue';
import ReviewCard from '../../components/Base/ReviewCard.vue';
import MovieDetailCard from '../../components/Base/MovieDetailCard.vue';

const route = useRoute();
const movieStore = useMovieStore();

const isLoading = ref(true);
const similarMovies = ref<Movie[]>([]);

const config = useRuntimeConfig();

const { data: detail, refresh } = await useAsyncData('detail', async () => {
    const [movie, reviews] = await Promise.all([
        $fetch<MovieDetail>(`${config.public.apiBase}/movie/${route.params.id}`, {
        query: {
            api_key: config.public.apiKey,
        },
        }),
        $fetch<ReviewList>(`${config.public.apiBase}/movie/${route.params.id}/reviews`, {
        query: {
            api_key: config.public.apiKey,
        },
        }),
    ]);

    const formattedReviews = reviews.results.map((item) => ({
        ...item,
        formatted_created_at: new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }) || ''
    }))
    const slicedReviews = formattedReviews.slice(0, 2);

    return {
        movie: {
            ...movie,
            list_genres: movie.genres?.map((genre) => genre.name).join(', ') || 'Unknown',
            formatted_release_date: new Date(movie.release_date).getFullYear() || '2xxx',
            formatted_budget: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.budget) || '',
            productionCompanies: movie.production_companies?.[0]?.name || 'Unknown'
        }, 
        reviews: slicedReviews
    };
});

watch(
  () => route.params.id,
  async (newId) => {
    isLoading.value = true;
    await refresh();
    await getData();
  }
);

onMounted(() => {
  getData();
});

const getData = async () => {
  try {

    if (detail.value?.movie.genres?.length === 0) {
        similarMovies.value = [];
    } else {
        await movieStore
          .getMovies({
            page: 1,
            with_genres: detail.value?.movie.genres[0].id,
            sort_by: 'vote_average.desc',
          })
          .then((res: MovieList) => {
            const formattedSimilarMovies = res.results.map((movie: Movie) => ({
                ...movie,
                formatted_vote_average: movie.vote_average.toFixed(1),
                formatted_release_date: new Date(movie.release_date).getFullYear() || '',
            }))
            similarMovies.value = formattedSimilarMovies.slice(0, 5);
          });
    }

  } catch (error) {
    console.error('Error fetching similar movies:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>


<style scoped>
.backdrop-image .image img {
    width: 100%;
    height: 600px;
    object-fit: cover;
    object-position: top;
}

.backdrop-image .image::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 1;
}

.backdrop-image .image::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 75px;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.8);
}
</style>