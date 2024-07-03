<template>
    <div class="snap-y__wrapper">
        <div class="snap-y__section">
            <HomeSlideIntroComponent v-if="indexSlideshowRef != null" :image-urls="indexSlideshowRef"/>
        </div>
    </div>
</template>

<script lang="ts" setup>

import {createSeoFunction} from "~/functions/create-seo.function";

definePageMeta({
    layout: "no-navbar-layout"
});

const indexSlideshowRef = ref<{} | null>(null);

useAsyncData('fetchSlideshow', () => queryContent('slideshow').where({title: 'index'}).findOne())
    .then(({data}) => {
      indexSlideshowRef.value = data.value;
      if(data.value != null) {
        createSeoFunction({
          title: "Majske igre",
          description: "Majske igre so največji študentski festival v Sloveniji, ki se odvija v Ljubljani. Vsako leto se v okviru festivala odvijajo športne, kulturne in zabavne prireditve.",
          imageUrl: data.value?.images[0].image
        });
      }
    });

</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";


.snap-y {
    position: relative;

    &__wrapper {
        overflow: auto;
        width: 100vw;
        min-height: 100vh;
    }

    &__section {
        min-height: 100%;
        scroll-snap-align: center;
    }
}

@media only screen and (min-width: 768px) {
    .snap-y {
        position: fixed;

        &__wrapper {
            width: 100vw;
            height: 100vh;
            scroll-snap-type: y mandatory;
        }

        &__section {
            height: 100%;
            scroll-snap-align: center;
        }
    }
}


</style>
