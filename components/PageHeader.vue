<template>
    <v-app-bar :color="page === 'detail' ? 'transparent' : '#1E232B'" scroll-behavior="elevate" class="px-12" style="z-index: 40 !important;">
        <div class="d-flex justify-space-between align-center w-100">
            <div class="logo">
                <a href="/">
                    <img src="../assets//images/moovietime-logo@2x.png" alt="logo" class="img-fluid w-24">
                </a>
            </div>
            <Searchbar />
            <Menu />
        </div>
    </v-app-bar>
</template>

<script setup lang="ts">
import Searchbar from '@/components/Header/Searchbar.vue'
import Menu from '@/components/Header/Menu.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const page = route.path.split('/')[1]

</script>
