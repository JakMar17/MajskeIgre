<template>
  <CardComponent
      class="mt-6"
      title="Sponzorji Majskih iger"
      :centered-titles="true"
  />
</template>

<script lang="ts" setup>

import {SponsorsModel} from "~/models/sponsor.model";

const sponsorsRef = ref<SponsorsModel | null>(null);

useAsyncData('fetchSponsors', () => queryContent<SponsorsModel>('majske-igre/sponsors').findOne().then(({data}) => {
  console.log("tukaj")
  sponsorsRef.value = data.value;
  console.log(sponsorsRef.value)
}));

</script>

<style scoped></style>