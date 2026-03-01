<template>
  <main class="container my-6">
    <CardComponent v-if="descriptionSiRef" :content="descriptionSiRef" />
    <CardComponent v-if="descriptionEnRef" class="mt-5" :content="descriptionEnRef" />
  </main>
</template>

<script setup lang="ts">
import { createSeoFunction } from '~/functions/create-seo.function';

const { data } = await useAsyncData('privacy-policy', () =>
  queryContent('descriptions/privacy-policy').findOne()
);

const descriptionSiRef = computed(() => data.value?.descriptionSi ?? null);
const descriptionEnRef = computed(() => data.value?.descriptionEn ?? null);

createSeoFunction({
  title: 'Politika zasebnosti - Majske igre',
  description: 'Politika zasebnosti aplikacije Majske igre.',
  imageUrl: '',
});
</script>
