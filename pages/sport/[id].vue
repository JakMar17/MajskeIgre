<template>
  <main class="wrapper">
    <CardImageComponent v-if="event"
        :title="event.title"
        :content="event.description"
        :imageUrl="event.imageUrl"
    >
      <template v-slot:title>
              <NuxtLink to="/sport" class="button is-info is-small is-outlined">
                <i class="ri-arrow-left-line"></i>
                <span class="ml-2">Nazaj</span>
              </NuxtLink>
<!--              <h2 class="title is-6 has-text-info mb-0 pb-0">{{ dateFormatted }}</h2>-->
        <h1 class="title is-1 mt-0 pt-0 mb-2">{{ event.title }}</h1>
      </template>

      <template v-slot:subtitle>
        <div class="mb-4">
          <div v-if="event.location" class="content__header-row">
            <i class="ri-map-2-fill"></i>
            <div class="has-text-weight-bold">{{ event.location }}</div>
          </div>
          <div v-if="event.price" class="content__header-row">
            <i class="ri-money-euro-circle-fill"></i>
            <div class="has-text-weight-bold">{{ event.price }}</div>
          </div>
          <div v-if="event.teamFormation" class="content__header-row">
            <i class="ri-team-fill"></i>
            <div class="has-text-weight-bold">{{ event.teamFormation }}</div>
          </div>
        </div>
      </template>

      <template v-slot:links>
        <div class="flex justify-content--end">
          <a :href="event.registerLink" target="_blank" class="button is-primary mt-4">
            <i class="ri-edit-2-fill"></i>
            <span class="ml-2">Prijava</span>
          </a>
        </div>
      </template>

    </CardImageComponent>
  </main>
</template>

<script lang="ts" setup>
import { SportEventModel } from '~/models/events/sport-event.model'
import {useRoute} from "#app";

const route = useRoute();
const event = ref<SportEventModel | null>(null);

console.log(route.params.id);

// const dateFormatted = computed(() => event.value === null ? '':
//     `${event.value.date.toLocaleDateString('sl-SL', {weekday: 'long'})}, ${event.value.date.toLocaleDateString('sl-SL', {day: 'numeric', month: 'long', year: 'numeric'})}, ob ${event.value.date.toLocaleTimeString('sl-SL', {minute: '2-digit', hour: '2-digit'})}`);


useAsyncData('fetchSportEvent', () => queryContent<SportEventModel>('sport-events').where({title: route.query.id}).findOne()).then(({data}) => event.value = data.value);

</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.wrapper {
  background: $sport-primary;
  padding: 4em 0;
  height: 100%;
}

.event-modal-content {
  position: relative;
  min-width: 100%;
  min-height: 100%;
}

.content {
  &__header-row {
    display: flex;
    align-items: baseline;
    gap: 1em
  }
}
</style>