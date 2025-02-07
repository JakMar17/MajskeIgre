<template>
  <section v-if="sponsorsRef?.showSponsors">
    <CardComponent
        class="mt-6"
        title="Sponzorji Majskih iger"
        :centered-titles="true"
        :content="sponsorsRef.description"
    />
  </section>
</template>

<script lang="ts" setup>

import {SponsorsModel} from "~/models/sponsor.model";

const sponsorsRef = ref<SponsorsModel | null>(null);

useAsyncData('fetchSponsors', () => queryContent<SponsorsModel>('majske-igre/sponsors').findOne().then((data) => {
  sponsorsRef.value = data;
}));

</script>

<style scoped></style>