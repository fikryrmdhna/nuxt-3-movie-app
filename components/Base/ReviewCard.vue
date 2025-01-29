<template>
    <v-card color="#F9F9F9" elevation="2" class="py-6 px-8" rounded="xl">
        <div class="flex align-center justify-between mb-6">
            <div class="flex align-center">
                <v-avatar color="#1E232B36" size="48" class="me-4"></v-avatar>
                <div>
                    <v-card-title class="pa-0">{{ review.author }}</v-card-title>
                    <v-card-subtitle class="pa-0">{{ review.formatted_created_at }}</v-card-subtitle>
                </div>
            </div>
            <div v-if="review.author_details.rating" class="flex align-start px-3 py-2 bg-[#C4C4C447] rounded-md">
                <v-icon class="w-1" color="yellow">mdi-star</v-icon>
                <p class="font-bold text-4xl">{{ review.author_details.rating }}</p>
            </div>
        </div>
        <p class="italic text-sm" v-html="review.content.length > 400 ? `${review.content.substring(0, 400)} <span class='text-red-500'>Read More...</span>` : review.content"></p>
    </v-card>
</template>

<script setup lang="ts">
defineProps({
    review: {
        type: Object,
        required: true,
    }
});
</script>
