<template>
    <p class="text-white text-lg">{{ detail.movie.formatted_release_date }}</p>
    <h1 class="text-white text-4xl font-bold">{{ detail.movie.title }}</h1>
    <p class="text-white text-sm">{{ detail.movie.list_genres }}</p>

    <div class="movie-scoring grid grid-cols-2 sm:flex sm:align-center mt-10">
        <div class="rating flex align-center">
             <v-icon class="w-7 me-1" color="yellow">mdi-star</v-icon>
            <div class="text-white text-2xl font-bold">{{ detail.movie.vote_average }}</div>
        </div>
        <div class="movie-info uppercase text-xs py-2 px-5 sm:border-r-[1px]">
            <p class="text-white/[.5] mb-1">User Score</p>
            <p class="text-white">{{ detail.movie.vote_count }} Votes</p>
        </div>
        <div class="movie-info uppercase text-xs py-2 px-5 sm:border-r-[1px]">
            <p class="text-white/[.5] mb-1">Status</p>
            <p class="text-white">{{ detail.movie.status }}</p>
        </div>
        <div class="movie-info uppercase text-xs py-2 px-5 sm:border-r-[1px]">
            <p class="text-white/[.5] mb-1">Language</p>
            <p class="text-white">{{ detail.movie.original_language }}</p>
        </div>
        <div class="movie-info uppercase text-xs py-2 px-5 sm:border-r-[1px]">
            <p class="text-white/[.5] mb-1">Budget</p>
            <p class="text-white">{{ detail.movie.formatted_budget }}</p>
        </div>
        <div class="movie-info uppercase text-xs py-2 px-5">
            <p class="text-white/[.5] mb-1">Production</p>
            <p class="text-white">{{ detail.movie.productionCompanies }}</p>
        </div>
    </div>
    <div class="movie-overview mt-10 w-75">
        <div class="text-[#FF0000] font-semibold uppercase mb-5">
            Overview
        </div>
        <p v-if="detail.movie.overview" class="text-sm text-black">
            {{ detail.movie.overview }}
        </p>
        <p v-else class="text-sm">
            This film has no overview
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps({
    detail: {
        type: Object,
        required: true,
    }
})
</script>

<style scoped>
@media screen and (max-width: 1023px) {
    .movie-overview .text-black {
        color: #fff !important;
    }
}
</style>
