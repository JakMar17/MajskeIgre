<template>
  <HeaderLogoComponent imageStyle="width: 25em"/>
  <main v-if="componentStateRef === 'loaded'" class="wrapper background">
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
  <ComponentStateLoadingComponent class="background" v-if="componentStateRef === 'loading'"/>
  <ComponentStateErrorComponent class="background" v-if="componentStateRef === 'error'"/>
</template>

<script lang="ts" setup>
import {SportEventModel} from '~/models/events/sport-event.model'
import {useRoute} from "#app";
import {ComponentState} from "~/models/component-state.model";

const route = useRoute();
const event = ref<SportEventModel | null>(null);
const componentStateRef = ref<ComponentState>('loading');

console.log(route.params.id);

// const dateFormatted = computed(() => event.value === null ? '':
//     `${event.value.date.toLocaleDateString('sl-SL', {weekday: 'long'})}, ${event.value.date.toLocaleDateString('sl-SL', {day: 'numeric', month: 'long', year: 'numeric'})}, ob ${event.value.date.toLocaleTimeString('sl-SL', {minute: '2-digit', hour: '2-digit'})}`);


useAsyncData(`fetchSportEvent~~${route.params.id}`, () => queryContent<SportEventModel>('sport-events').where({title: route.query.id}).findOne())
    .then(({data}) => {
      event.value = data.value;
      componentStateRef.value = 'loaded';
    }).catch(() => componentStateRef.value = 'error');

</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.background {
  background-color: $sport-primary;
}

.wrapper {
  padding-bottom: 4em;
  height: 100%;
}

.content {
  &__header-row {
    display: flex;
    align-items: baseline;
    gap: 1em
  }
}
</style>