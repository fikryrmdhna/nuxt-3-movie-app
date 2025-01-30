<template>
    <div class="w-full md:w-1/3 navbar-search">
        <v-text-field
            v-model="keyword"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Search templates"
            variant="solo"
            bg-color="rgba(0,0,0,0.13)"
            hide-details
            single-line
            clearable
            @click:clear="clearSearch"
            @keyup="searchMovie"
            @focus="showDropdown = true"
        >
            <template #prepend-inner>
                <img src="../../assets/images/movie-icon@2x.png" alt="logo movie" class="img-fluid" />
            </template>
        </v-text-field>
        <v-card v-if="showDropdown && autocompletes.length" class="-bottom-40 left-0 !bg-black/90">
            <ul>
                <li v-for="movie in autocompletes" :key="movie.id" class="text-white px-3 py-1" @click="clearSearch">
                    <NuxtLink :to="`/movie/${movie.id}`">
                        {{ movie.title }}
                    </NuxtLink>
                </li>
            </ul>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMovieStore } from '../../stores/movie';

const movieStore = useMovieStore();
const showDropdown = ref(false);
const keyword = ref('');

const autocompletes = computed(() => movieStore.autocompletes)

function debounce(fn: Function, delay: number) {
    let timer: ReturnType<typeof setTimeout>

    return function (...args: any[]) {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
    };
}

const searchMovie = debounce((e: any) => {
    keyword.value = e.target.value

    movieStore.getMovieByQuery({ query: e.target.value })
    .then(() => {
        if (autocompletes.value.length > 0) {
            showDropdown.value = true;
        }
    });
}, 500)

const clearSearch = () => {
    showDropdown.value = false;
    keyword.value = '';
    searchMovie()
}
</script>

<style scoped>
.navbar-search {
    color: #fff !important;
    position: relative;
}

.navbar-search .v-card {
    position: absolute;
    width: 100%;
}
</style>
