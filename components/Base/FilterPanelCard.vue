<template>
    <v-card class="filter-sidepanel" elevation="0" color="rgba(0, 0, 0, 0.7)">
        <p class="py-8 px-6 text-md font-medium text-white">Sort Result By</p>
    
        <div class="sorting-wrapper py-6 px-4">
            <v-select
            v-model="localSorting"
            :items="sortingValue"
            item-title="text"
            item-value="value"
            label="Select Sorting"
            variant="outlined"
            class="py-2 px-6"
            bg-color="rgba(224, 224, 224, 0.13)"
            base-color="rgba(224, 224, 224, 0.13)"
            color="rgba(224, 224, 224, 0.13)"
            item-color="rgba(224, 224, 224, 0.13)"
            hide-details
            single-line
            ></v-select>
        </div>
    
        <p class="py-8 px-6 text-md font-medium text-white" style="border-bottom: 1px solid rgba(255, 255, 255, 0.07);">Genre</p>
    
        <div class="genre-wrapper px-4 py-5">
            <v-checkbox
            v-model="localGenre"
            v-for="g in genreValue"
            color="rgba(231, 76, 60, 1)"
            base-color="#fff"
            :key="g.id"
            :label="g.name"
            :value="g.id"
            hide-details
            ></v-checkbox>
        </div>
    </v-card>
</template>
  
<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, watch } from 'vue';


const props = defineProps<{
    sortingValue: { text: string; value: string }[];
    genreValue: { id: number; name: string }[];
    sortingModel?: string | null;
    genreModel?: number[];
}>();

const emit = defineEmits(["update:sorting", "update:genre"]);

const localSorting = ref(props.sortingModel || null);
const localGenre = ref(props.genreModel || []);

watch(localSorting, (newValue) => {
    emit("update:sorting", newValue);
});

watch(localGenre, (newValue) => {
    emit("update:genre", newValue);
});
</script>
