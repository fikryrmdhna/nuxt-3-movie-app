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
import { useAuthStore } from '../stores/auth';

const movieStore = useMovieStore();
const authStore = useAuthStore();

onMounted(async () => {
    // await authStore.checkSession();
    movieStore.getGenres();
    movieStore.getFavorite();
})

</script>
