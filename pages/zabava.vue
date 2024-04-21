<template>
  <main class="wrapper">
    <HeaderLogoComponent/>
    <CardComponent v-if="descriptionRef != null" style="margin-bottom: 3em" :content="descriptionRef?.description"/>
    <section v-if="showScheduleRef" class="concert__section" v-for="(concert, index) in concertsRef">
      <div class="concert__title__wrapper">
        <div class="container concert__title__container">
          <h1 class="title is-1 mb-2">{{ concert.title }}</h1>
          <h2 class="title is-6">{{ concert.location.toUpperCase() }} - {{ concert.date }}</h2>
        </div>
      </div>

      <CardImageComponent style="text-align: center" :imageUrl="concert.imageUrl" :content="concert.performers" :reversed="index % 2 === 0"/>
    </section>

    <EventsNoContentComponent v-else type="zabava" title="Kdo bo stopil na oder je še skrivnost" content="...a ne za dolgo - spremljaj naša socialna omrežja in bodi prvi, ki boš izvedel!"/>
    <div v-if="descriptionRef?.additionalInfo" style="padding-bottom: 3em">
      <CardComponent :content="descriptionRef?.additionalInfo"/>
    </div>
  </main>
</template>

<script lang="ts" setup>
import {ConcertEventModel} from "~/models/events/concert-event.model";
import {DescriptionModel} from "~/models/description.model";
import {createSeoFunction} from "~/functions/create-seo.function";

const concertsRef = ref<ConcertEventModel[]>([]);
const descriptionRef = ref<DescriptionModel | null>(null);
const showScheduleRef = ref<boolean>(false);

const fetchDescription = () => queryContent<DescriptionModel>('descriptions/concert').findOne().then((description) => {
  descriptionRef.value = description;
  showScheduleRef.value = description.showSchedule;
  createSeoFunction({
    title: "Zabava - Majske igre",
    description: description.description,
    imageUrl: description.coverImage
  });
})

const fetchConcerts = () => queryContent<ConcertEventModel>('concerts').sort({date: 1}).find().then((concerts) => {
  concertsRef.value = (concerts ?? []).map(v => {
    v.date = new Date(v.date).toLocaleDateString();
    return v;
  });
});


useAsyncData('fetchData', () => {
  fetchDescription();
  fetchConcerts();
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