<template>
    <v-app>
        <PageHeader />
        <main>
            <slot></slot>
        </main>
        <PageFooter />
    </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import PageHeader from '../components/PageHeader.vue';
import PageFooter from '../components/PageFooter.vue';

import { useMovieStore } from '../stores/movie';

const movieStore = useMovieStore();

onMounted(() => {
    movieStore.getGenres();
    movieStore.getFavorite();
})

</script>
