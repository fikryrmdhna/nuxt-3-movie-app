<template>
    <div v-if="!isLoading">
        <section class="bg-[#1E232B] pb-14">
            <v-container-fluid class="slider-top">
                <div class="row">
                    <div class="col-12">
                        <Carousel :items-to-show="2.5" :wrap-around="true" :autoplay="5000" :transition="500">
                            <Slide v-for="trending in trendings" :key="trending.id">
                                <v-card class="carousel__item p-24" elevation="0" style="background-color: transparent;">
                                    <div class="d-flex relative align-center">
                                        <div class="w-70 relative">
                                            <NuxtImg fit="cover" :src="`http://image.tmdb.org/t/p/w500/${trending.poster_path}`" width="700" height="100" />
                                        </div>
                                        <div class="detail-movie relative text-center px-8">
                                            <div class="rating d-flex align-center">
                                                <v-icon class="w-5 me-1" color="yellow">mdi-star</v-icon>
                                                <p class="text-white font-bold text-xl ml-1">{{ trending.vote_average.toFixed(1) }}</p>
                                            </div>
                                            <p class="text-left text-3xl text-white font-medium">
                                                <NuxtLink :to="`/movie/${trending.id}`">{{ trending.title }}</NuxtLink>
                                            </p>
                                            <p class="text-left text-white my-1">{{ new Date(trending.release_date).getFullYear() }}</p>
                                            <p class="text-left text-white text-sm">{{ trending.overview.length > 125 ? `${trending.overview.substring(0, 125)}...` : trending.overview }}</p>
                                        </div>
                                    </div>
                                </v-card>
                            </Slide>
        
                            <template #addons>
                                <navigation />
                                <pagination />
                            </template>
                        </Carousel>
                    </div>
                </div>
            </v-container-fluid>
        </section>
        <section class="relative bg-[#1E232B] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-72 before:bg-white/5">
            <v-container class="py-16 relative seach-main">
                <h1 class="title-page text-white text-3xl">
                    Discover Movies
                </h1>
                <v-row class="mt-6">
                    <v-col cols="3">
                        <v-card
                            class="filter-sidepanel"
                            elevation="0"
                            color="rgba(0, 0, 0, 0.7)"
                        >
                            <p class="py-8 px-6 text-md font-medium text-white">Sort Result By</p>
        
                            <div class="sorting-wrapper py-6 px-4">
                                <v-select
                                    v-model="selectedSorting"
                                    :items="sorting"
                                    item-title="text"
                                    item-value="value"
                                    label="Select Sorting"
                                    variant="outlined"
                                    class="py-2 px-6"
                                    bg-color="rgba(224, 224, 224, 0.13)"
                                    base-color="rgba(224, 224, 224, 0.13)"
                                    color="rgba(224, 224, 224, 0.13)"
                                    item-color="rgba(224, 224, 224, 0.13)"
                                    hide-details
                                    single-line
                                ></v-select>
                            </div>
        
                            <p class="py-8 px-6 text-md font-medium text-white" style="border-bottom: 1px solid rgba(255, 255, 255, 0.07);">Genre</p>
        
                            <div class="genre-wrapper px-4 py-5">
                                <v-checkbox
                                    v-model="selectedGenre"
                                    v-for="g in genre"
                                    color="rgba(231, 76, 60, 1)"
                                    base-color="#fff"
                                    :key="g.id"
                                    :label="g.name"
                                    :value="g.id"
                                    hide-details
                                ></v-checkbox>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="9">
                        <MovieCard v-if="!isLoadingMovies" :movies="movies" :className="'grid grid-cols-4 gap-6 mb-3'" />
                        <div v-else class="grid grid-cols-4 gap-6 mb-3">
                            <v-skeleton-loader v-for="i in 20" :key="i" type="image"></v-skeleton-loader>
                        </div>
                        <div class="text-center">
                            <v-btn
                                density="default" 
                                elevation="0" 
                                class="mt-4 text-white"
                                color="#E74C3C"
                                rounded  
                                @click="handlePageOnClick"
                            >
                                Load More
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </div>
    <div v-else class="fixed h-100 w-100 bg-[#1E232B] top-0 left-0 z-50 flex align-center justify-center">
        <v-progress-circular
            :size="70"
            :width="7"
            color="#fff"
            indeterminate
        ></v-progress-circular>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useMovieStore } from '@/stores/movie';
import type { Movie, MovieList } from '@/types/movie';

import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

import MovieCard from '~/components/Base/MovieCard.vue';

import 'vue3-carousel/dist/carousel.css'

definePageMeta({
  layout: 'default'
})

const movieStore = useMovieStore();

const trendings = ref<Movie[]>([]);
const movies = ref<Movie[]>([]);
const isLoading = ref<boolean>(true);
const isLoadingMovies = ref<boolean>(true);
const page = ref(1)
const selectedSorting = ref(null)
const selectedGenre = ref<number[]>([]);

const sorting = [
    { text: 'Popularity Ascending', value: 'popularity.asc' },
    { text: 'Popularity Descending', value: 'popularity.desc' },
    { text: 'Release Date Ascending', value: 'release_date.asc' },
    { text: 'Release Date Descending', value: 'release_date.desc' },
    { text: 'Rating Ascending', value: 'vote_average.asc' },
    { text: 'Rating Descending', value: 'vote_average.desc' }
]

const genre = computed(() => movieStore.genres)

onMounted(() => {
    getTrendingData()
    getMovies()
});

watch(
  [selectedGenre, selectedSorting],
  () => {
    getMovies();
  }
);

const getTrendingData = () => {
  movieStore.getTrendingMovies()
    .then((res: MovieList) => {
      trendings.value = res.results.slice(0, 5);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

const getMovies = () => {
    isLoadingMovies.value = true
    movieStore.getMovies({ page: page.value, with_genres: selectedGenre.value.join(','), sort_by: selectedSorting.value })
        .then((res: MovieList) => {
            console.log('movies', res.results);
            movies.value = res.results.map((item) => {
                return {
                    ...item,
                    formatted_vote_average: item.vote_average.toFixed(1),
                    formatted_release_date: new Date(item.release_date).getFullYear() || '',
                }
            })
        })
        .finally(() => {
            setTimeout(() => {
                isLoadingMovies.value = false
            }, 1000);
        })
}

const handlePageOnClick = () => {
    page.value += 1
    movieStore.getMovies({ page: page.value, with_genres: selectedGenre.value.join(','), sort_by: selectedSorting.value })
        .then((res) => {
            movies.value = [...movies.value, ...res.results];
        })
}
</script>

<style scoped>
 .carousel__slide {
  padding: 10px;
}

.home-discover::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 150px;
    background: rgba(255, 255, 255, 0.1);
    scale: 2;
    top: 115px;
}

.carousel__pagination {
    bottom: -20px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: opacity var(--carousel-transition), transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition: opacity var(--carousel-transition), transform var(--carousel-transition);
}

.carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(10px) rotateY(-12deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(-10deg) scale(0.9);
}

.carousel__slide--active {
  opacity: var(--carousel-opacity-active);
  transform: rotateY(0) scale(1);
}

.carousel__slide--next {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(10deg) scale(0.9);
}

.carousel__slide--next ~ .carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(-10px) rotateY(12deg) scale(0.9);
}

.carousel__slide--next .w-70::after, .carousel__slide--prev .w-70::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
}

.carousel__slide--next .detail-movie::after, .carousel__slide--prev .detail-movie::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
}
</style>