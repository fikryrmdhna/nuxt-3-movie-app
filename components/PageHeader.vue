<template>
    <v-app-bar :color="page === 'detail' ? 'transparent' : '#1E232B'" scroll-behavior="elevate" class="px-6 md:px-12" style="z-index: 999 !important;">
        <div class="flex md:justify-between align-center w-100">
            <div class="logo">
                <a href="/">
                    <img src="../assets//images/moovietime-logo@2x.png" alt="logo" class="img-fluid w-24">
                </a>
            </div>
            <Searchbar class="d-none ml-4 md:ml-0 d-sm-block" />
            <Menu class="d-none d-md-block" />
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
