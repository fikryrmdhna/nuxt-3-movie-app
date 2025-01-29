<template>
    <div :class="className">
        <div v-for="movie in movies" :key="movie.id" class="group/item relative card-movie">
            <div class="image relative">
                <NuxtImg
                    :src="movie.poster_path ? `http://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://placehold.co/215x320'"
                    :alt="movie.title" 
                    class="w-full image-poster"
                    format="webp"
                    loading="lazy"
                    fit="cover"
                />
                <span class="absolute top-0 right-0 bg-gray-800 text-white p-2 font-medium">{{ movie.formatted_vote_average }}</span>

                <div class="group/edit hidden hover:bg-black/[.95] group-hover/item:flex absolute left-0 top-0 bg-black/[.95] flex-col justify-center align-center w-full h-full transition ease-in-out delay-150  hover:scale-100 duration-100">
                    <div class="flex align-center">
                        <v-icon class="w-2" color="yellow">mdi-star</v-icon>
                        <p class="font-bold text-lg text-white ml-1">{{ movie.formatted_vote_average }}</p>
                    </div>
                    <p class="font-medium text-lg text-white ml-2 my-3">{{ getGenre(movie.genre_ids) }}</p>
                    <v-btn
                        density="default" 
                        elevation="0" 
                        class="mt-4 text-white"
                        color="#E74C3C"
                        size="small"
                        :to="`/movie/${movie.id}`"
                        rounded
                    >
                        View
                    </v-btn>
                    <v-btn
                        density="default" 
                        elevation="0" 
                        class="mt-2 text-white"
                        :color="!isAdded ? '#E74C3C' : '#A9FFC6'"
                        size="small"
                        rounded
                        :variant="!isAdded ? 'outlined' : 'flat'"
                        @click="addToFavorite(movie.id)"
                    >
                        Add
                    </v-btn>
                </div>
            </div>
            <p class="text-white text-lg">{{ movie.title }}</p>
            <p class="text-[#929292] text-sm">{{ movie.formatted_release_date }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useMovieStore } from '@/stores/movie';

const movieStore = useMovieStore();
const isAdded = ref(false)

defineProps({
    movies: {
        type: Object,
        required: true,
    },
    className: {
        type: String,
        required: false,
    },
});

const genre = computed(() => movieStore.genres)

const getGenre = (genres: any[]) => {
    const findGenre = genre.value.find((genre) => genre.id === genres[0]) || null;
    
    return findGenre?.name || ''
}

const addToFavorite = (movieId: number | string) => {
    movieStore.postFavorite(movieId)
        .then((res) => {
            console.log('res', res)
            isAdded.value = true
            movieStore.getFavorite()
        })
        .finally(() => {
            setTimeout(() => {
                isAdded.value = false
            }, 5000)
        })
}
</script>
