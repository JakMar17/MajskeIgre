<template>
  <main v-if="descriptionRef">

    <div class="flex justify-content--center">
      <img style="max-width: 50em" src="../assets/images/svgs/logo-majske.svg"/>
    </div>

    <div>

      <CardComponent
          class="mb-4"
          title="Kaj so Majske igre?"
          :centered-titles="true"
          :content="descriptionRef.description"
      />

      <CardImageComponent
          class="sport__wrapper"
          title="Šport"
          :image-url="descriptionRef.sportImage"
          :content="descriptionRef.sportDescription">
        <template v-slot:title>
          <div class="flex justify-content--between align-items--baseline">
            <h1 class="title is-2">Šport</h1>
            <img style="height: 8em" src="../assets/images/majske-igre/sportko.svg"/>
          </div>
        </template>
      </CardImageComponent>

      <CardImageComponent
          class="culture__wrapper"
          title="Kultura"
          :image-url="descriptionRef.cultureImage"
          :content="descriptionRef.cultureDescription"
      >
        <template v-slot:title>
          <div class="flex justify-content--between align-items--baseline">
            <h1 class="title is-2">Kultura</h1>
            <img style="height: 8em" src="../assets/images/majske-igre/kulturko.svg"/>
          </div>
        </template>

      </CardImageComponent>

      <CardImageComponent
          class="concert__wrapper"
          title="Zabava"
          :image-url="descriptionRef.concertImage"
          :content="descriptionRef.concertDescription"
      >
        <template v-slot:title>
          <div class="flex justify-content--between align-items--baseline">
            <h1 class="title is-2">Zabava</h1>
            <img style="height: 8em" src="../assets/images/majske-igre/zabavko.svg"/>
          </div>
        </template>
      </CardImageComponent>
    </div>

    <CardComponent
        class="mt-6"
        title="Organizator Majskih iger - Študentski svet stanovalcev"
        :centered-titles="true"
        :content="descriptionRef.organizer"
    />

    <CardImageComponent
      title="Organizacijska ekipa"
      :image-url="descriptionRef.teamImage"
      :content="descriptionRef.teamDescription"
      :reversed="true"
    />

  </main>

</template>

<script lang="ts" setup>

import {MajskeDescriptionModel} from "~/models/majske-description.model";

const descriptionRef = ref<MajskeDescriptionModel | null>(null);
useAsyncData('fetchDescriptions', () => queryContent('descriptions/event').findOne()).then(console.log)

useAsyncData('fetchDescriptions', () => queryContent<MajskeDescriptionModel>('descriptions/event').findOne())
    .then(({data}) => descriptionRef.value = data.value);

</script>

<style scoped lang="scss">
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
