<template>
  <main class="wrapper">
    <HeaderLogoComponent/>
    <CardComponent v-if="descriptionRef != null" style="margin-bottom: 3em" :content="descriptionRef?.description"/>
    <section v-if="showScheduleRef" class="concert__section" v-for="(concert, index) in concertsRef">
      <div class="concert__title__wrapper">
        <div class="container concert__title__container">
          <h1 class="title is-1 mb-2">{{ concert.title }}</h1>
          <h2 class="title is-6">{{ concert.location.toUpperCase() }} - {{ concert.date }}</h2>
          <a v-if="concert.playlist" :href="concert.playlist" target="_blank" class="is-link" style="background: #122b41; padding: 0.5em 1em; border-radius: 999px; display: flex; gap: 1em; align-items: center">
            <div>
              <img src="../assets/images/playlist.png" style="height: 32px"/>
            </div>
            <div style="color: white">
              Predvajaj na Spotify
            </div>
          </a>
        </div>
      </div>

      <CardImageComponent style="text-align: center" :imageUrl="concert.imageUrl" :content="concert.performers" :reversed="index % 2 === 0"/>

      <MapComponent :geoLocation="concert.geoLocation"/>
    </section>

    <EventsNoContentComponent v-else type="zabava" title="Kdo bo stopil na oder je še skrivnost" content="...a ne za dolgo - spremljaj naša socialna omrežja in bodi prvi, ki boš izvedel!"/>

    <section class="predmajski__teaser">
      <div class="predmajski__spotlight"></div>
      <div class="container predmajski__container">
        <div class="predmajski__label">
          <i class="ri-music-2-line"></i> Pred velikim večerom
        </div>
        <h2 class="predmajski__title">Predmajski špil</h2>
        <p class="predmajski__subtitle">Boj za oder Majskih iger</p>
        <p class="predmajski__description">
          Preden zasedbe stopijo na glavni oder, se morajo najprej dokazati. Predmajski špil je tekmovalni glasbeni večer, kjer mladi izvajalci tekmujejo za priložnost nastopa na Majskih igrah.
        </p>
        <NuxtLink to="/predmajski-spil" class="button is-rounded is-primary">
          <i class="ri-trophy-line mr-2"></i> Več o Predmajskem špilu
        </NuxtLink>
      </div>
    </section>

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
    return {
      ...v,
      date: new Date(v.date).toLocaleDateString(),
    } as ConcertEventModel;
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

$predmajski-accent: rgba(255, 210, 80, 1);
$predmajski-accent-glow: rgba(255, 210, 80, 0.35);

.predmajski {
  &__teaser {
    position: relative;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.25);
    padding: 4em 1em;
    text-align: center;
    margin-bottom: 0;
  }

  &__spotlight {
    position: absolute;
    top: -4em;
    left: 50%;
    transform: translateX(-50%);
    width: 60vw;
    height: 20em;
    background: radial-gradient(ellipse at top, rgba(255, 210, 80, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  &__container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75em;
  }

  &__label {
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: $predmajski-accent;
    filter: drop-shadow(0 0 6px $predmajski-accent-glow);
    display: flex;
    align-items: center;
    gap: 0.4em;
  }

  &__title {
    font-size: 2.2em;
    font-weight: 800;
    color: white;
    margin: 0;
    line-height: 1.1;
  }

  &__subtitle {
    font-size: 1em;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    font-style: italic;
  }

  &__description {
    max-width: 36em;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
    margin: 0.5em 0 1em;
  }
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