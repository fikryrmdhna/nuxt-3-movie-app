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
import PageHeader from '../components/PageHeader.vue';
import PageFooter from '../components/PageFooter.vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const page = route.path.split('/')[1]
</script>
