<template>
    <div class="navbar-menu">
        <ul class="d-flex">
            <li v-for="(menu, i) in menus" :key="i">

                <v-menu
                    v-if="menu.child"
                    open-on-hover
                >
                    <template v-slot:activator="{ props }">
                        <a v-bind="props" href="#" class="font-medium text-white text-sm">
                            <v-icon :icon="menu.icon"></v-icon>
                            {{ menu.text }}
                        </a>
                    </template>

                    <v-list>
                        <v-list-item
                            v-for="item in menu.child"
                            :key="item.id"
                        >
                         <v-list-item-title>
                             <NuxtLink :to="`/search?genreId=${item.id}`" class="text-sm">
                                {{ item.text }}
                            </NuxtLink>
                        </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <a v-else href="#" class="font-medium text-white text-sm">{{ menu.text }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const menus = [
    { 
        id: 1, 
        text: 'Categories',
        icon: 'mdi mdi-view-grid',
        child: [
            { id: 28, text: 'Action' },
            { id: 12, text: 'Adventure' },
            { id: 16, text: 'Animation' },
            { id: 35, text: 'Comedy' },
            { id: 80, text: 'Crime' },
            { id: 99, text: 'Documentary' },
            { id: 18, text: 'Drama' },
            { id: 10751, text: 'Family' },
            { id: 14, text: 'Fantasy' },
            { id: 36, text: 'History' },
            { id: 27, text: 'Horor' }
        ]
    },
    { id: 2, text: 'Movies' },
    { id: 3, text: 'TV Shows' },
    { id: 4, text: 'Login' }
]
</script>

<style scoped>
.navbar-menu ul li{
    margin: 0 10px;
}
</style>
