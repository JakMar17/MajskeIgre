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

      <div v-if="concert.mapEmbedUrl" class="concert__map__wrapper">
        <div class="container">
          <iframe
            :src="concert.mapEmbedUrl"
            width="100%"
            height="220"
            style="border: 0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :title="`Lokacija dogodka ${concert.title}`"
          />
        </div>
      </div>
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

const concertsRef = ref<ConcertViewModel[]>([]);
const descriptionRef = ref<DescriptionModel | null>(null);
const showScheduleRef = ref<boolean>(false);

type ConcertGeoPoint = {
  type: string;
  coordinates: [number, number];
};

type ConcertViewModel = ConcertEventModel & {
  mapEmbedUrl?: string;
};

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
    const parsedGeoLocation = parseGeoLocation(v.geoLocation);
    const mapEmbedUrl = parsedGeoLocation
      ? createMapEmbedUrl(parsedGeoLocation.coordinates[1], parsedGeoLocation.coordinates[0])
      : undefined;

    return {
      ...v,
      date: new Date(v.date).toLocaleDateString(),
      mapEmbedUrl
    } as ConcertViewModel;
  });
});

function parseGeoLocation(geoLocation?: string): ConcertGeoPoint | null {
  if (!geoLocation) return null;

  try {
    const parsed = JSON.parse(geoLocation) as ConcertGeoPoint;
    const [longitude, latitude] = parsed.coordinates ?? [];

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function createMapEmbedUrl(latitude: number, longitude: number): string {
  const zoom = 17;
  const delta = 0.0012;
  const left = longitude - delta;
  const right = longitude + delta;
  const top = latitude + delta;
  const bottom = latitude - delta;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${latitude}%2C${longitude}&zoom=${zoom}`;
}


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