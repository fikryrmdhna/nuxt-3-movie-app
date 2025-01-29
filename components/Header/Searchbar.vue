<template>
    <div class="w-1/3 navbar-search">
        <v-text-field
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Search templates"
            variant="solo"
            bg-color="rgba(0,0,0,0.13)"
            hide-details
            single-line
            @keyup="searchMovie"
        ></v-text-field>
    </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '@/stores/movie';

const movieStore = useMovieStore();

const datas = useState()

onMounted(() => {
    console.log('mounted: ', movieStore.autocompletes)
})

function searchMovie () {
    console.log('search')
}
</script>

<style scoped>
.navbar-search {
    color: #fff !important;
}
</style>
