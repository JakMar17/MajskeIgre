<template>
  <main class="wrapper">
    <HeaderLogoComponent/>
    <CardComponent v-if="descriptionRef != null" style="margin-bottom: 3em" :content="descriptionRef.description"/>
    <section class="concert__section" v-for="(concert, index) in concertsRef">
      <div class="concert__title__wrapper">
        <div class="container concert__title__container">
          <h1 class="title is-1 mb-2">{{ concert.title }}</h1>
          <h2 class="title is-6">{{ concert.location.toUpperCase() }} - {{ concert.date }}</h2>
        </div>
      </div>

      <CardImageComponent style="text-align: center" :imageUrl="concert.imageUrl" :content="concert.performers" :reversed="index % 2 === 0"/>
    </section>
  </main>
</template>

<script lang="ts" setup>
import {ConcertEventModel} from "~/models/events/concert-event.model";
import {DescriptionModel} from "~/models/description.model";

const concertsRef = ref<ConcertEventModel[]>([]);
const descriptionRef = ref<DescriptionModel | null>(null);

// data fetching
useAsyncData('fetchConcerts', () => queryContent<ConcertEventModel>('concerts').sort({date: 1}).find())
    .then(({data}) => {
      concertsRef.value = (data.value ?? []).map(v => {
        v.date = new Date(v.date).toLocaleDateString();
        return v;
      });
    });

useAsyncData('fetchDescription', () => queryContent<DescriptionModel>('descriptions/concert').findOne())
    .then(({data}) => {
      descriptionRef.value = data.value;
    });
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.wrapper {
  background: $zabava-primary;
}

.concert {
  &__section {
    padding-bottom: 4em;
  }

  &__title {
    &__wrapper {
      background: white;
    }

    &__container {
      padding: 1em 10%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 5em;
    }
  }
}

</style>