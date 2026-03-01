<template>
  <main v-if="contentData">
    <div class="flex justify-content--center">
      <img style="width: 50em" src="../assets/images/svgs/logo-majske.svg" />
    </div>

    <div v-if="appLinks?.googlePlayStore || appLinks?.appleAppStore" class="flex justify-content--center app-links">
      <a v-if="appLinks?.googlePlayStore" :href="appLinks.googlePlayStore" target="_blank" class="button is-primary is-rounded">
        <span class="icon"><i class="ri-google-play-fill"></i></span>
        <span>Google Play</span>
      </a>
      <a v-if="appLinks?.appleAppStore" :href="appLinks.appleAppStore" target="_blank" class="button is-primary is-rounded">
        <span class="icon"><i class="ri-apple-fill"></i></span>
        <span>App Store</span>
      </a>
    </div>

    <div>
      <CardComponent class="mb-4" title="Majske igre – festival študentskih domov" :centered-titles="true"
        :content="contentData.description" />

      <CardImageComponent class="sport__wrapper" title="Šport" :image-url="contentData.sportImage"
        :content="contentData.sportDescription" :links="[links.sport]">
        <template v-slot:title>
          <div class="flex justify-content--between align-items--baseline">
            <h1 class="title is-2">Šport</h1>
            <img style="height: 8em" src="../assets/images/majske-igre/sportko.svg" />
          </div>
        </template>
      </CardImageComponent>

      <CardImageComponent class="culture__wrapper" title="Kultura" :image-url="contentData.cultureImage"
        :content="contentData.cultureDescription" :links="[links.culture]">
        <template v-slot:title>
          <div class="flex justify-content--between align-items--baseline">
            <h1 class="title is-2">Kultura</h1>
            <img style="height: 8em" src="../assets/images/majske-igre/kulturko.svg" />
          </div>
        </template>
      </CardImageComponent>

      <CardImageComponent class="concert__wrapper" title="Zabava" :image-url="contentData.concertImage"
        :content="contentData.concertDescription" :links="[links.concerts]">
        <template v-slot:title>
          <div class="flex justify-content--between align-items--baseline">
            <h1 class="title is-2">Zabava</h1>
            <img style="height: 8em" src="../assets/images/majske-igre/zabavko.svg" />
          </div>
        </template>
      </CardImageComponent>
    </div>

    <CardComponent class="mt-6" title="Organizator Majskih iger - Študentski svet stanovalcev" :centered-titles="true"
      :content="contentData.organizer" />

    <CardImageComponent title="Organizacijska ekipa" :image-url="contentData.teamImage"
      :content="contentData.teamDescription" :links="[contactLink]" :reversed="true" />
  </main>
</template>

<script lang="ts" setup>
import { createSeoFunction } from "~/functions/create-seo.function";

const links = {
  concerts: {
    title: 'Kdo nastopa?',
    link: '/zabava',
    buttonType: 'is-primary is-fullwidth'
  },
  culture: {
    title: 'Razpored kulturnih otočkov',
    link: '/kultura',
    buttonType: 'is-primary is-fullwidth'
  },
  sport: {
    title: 'Razpored športov',
    link: '/sport',
    buttonType: 'is-primary is-fullwidth'
  }
};

const contactLink = {
  title: 'Kontakt ekipe',
  link: '/kontakt',
  buttonType: 'is-primary'
};

import type { AppLinksModel } from '~/models';

const { data: contentData } = await useAsyncData('fetchDescriptions', () => 
  queryContent('descriptions/event').findOne()
);

const { data: appLinks } = await useAsyncData<AppLinksModel>('fetchAppLinks', () =>
  queryContent<AppLinksModel>('descriptions/app-links').findOne()
);

// Safe SSR/prerender access using contentData directly
useHead(() => ({
  title: 'Majske igre',
  meta: [
    { name: 'description', content: contentData.value?.description ?? '' },
    { property: 'og:image', content: contentData.value?.concertImage ?? '' }
  ]
}));

// Or keep your createSeoFunction if it handles useHead/meta
if (contentData.value) {
  createSeoFunction({
    title: "Majske igre",
    description: contentData.value.description ?? '',
    imageUrl: contentData.value.concertImage ?? ''
  });
}
</script>

<style scoped lang="scss">
.app-links {
  gap: 0.75em;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

@import "@/assets/styles/main.scss";

.sport {
  &__wrapper {
    background: $sport-primary;
  }
}

.culture {
  &__wrapper {
    background: $kultura-primary;
  }
}

.concert {
  &__wrapper {
    background: $zabava-primary;
  }
}
</style>
