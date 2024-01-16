<template>
  <HeaderLogoComponent class="background"/>
  <ComponentStateLoadingComponent class="background" v-if="componentStateRef === 'loading'"/>
  <ComponentStateErrorComponent class="background" v-if="componentStateRef === 'error'"/>
  <main v-if="componentStateRef === 'loaded'" class="background">
    <CardComponent style="margin-bottom: 3em" content="Športni program je sestavljen iz 4 koncertnih dogodkov"/>

    <CardImageComponent v-for="(dayEvent, index) in dayEventsRef"
                        :key="index"
                        :imageUrl="getCoverImage(dayEvent)"
                        :title="getDayString(dayEvent.date)"
                        :reversed="index % 2 === 0"
    >
      <template v-slot:content>
        <div class="container mt-4">
          <h4 v-for="event in dayEvent.events">
            <NuxtLink :to="`/sport/${event.title}`" class="title is-5 has-text-link">{{ getEventStartTime(event) }} - {{ event.title }}</NuxtLink>
          </h4>
        </div>
      </template>
    </CardImageComponent>
  </main>
</template>

<script lang="ts" setup>

import {SportEventModel} from "~/models/events/sport-event.model";
import {Ref} from "vue";
import {ComponentState} from "~/models/component-state.model";

const dayEventsRef: ref<dayEvents[]> = ref([]);
const componentStateRef = ref<ComponentState>('loading');

type dayEvents = {
  date: Date;
  events: SportEventModel[];
}

const getDayString = (date: Date) => {
  const dayOfWeek = date.toLocaleDateString('sl-SI', {weekday: 'long'});
  const monthLong = date.toLocaleDateString('sl-SI', {month: 'long'});
  const day = date.getDate();
  const year = date.getFullYear();

  return `${dayOfWeek.charAt(0).toUpperCase()}${dayOfWeek.slice(1)}, ${day}. ${monthLong} ${year}`;
}

const getCoverImage = (dayEvent: dayEvents) => {
  for (const event of dayEvent.events) {
    if (event.imageUrl) {
      return event.imageUrl;
    }
  }
}

const getEventStartTime = ({date}: SportEventModel) =>
    new Date(date).toLocaleTimeString('sl-SL', {hour: '2-digit', minute: '2-digit'});

useAsyncData('fetch', () => queryContent<SportEventModel>('sport-events').sort({date: 1}).find())
    .then(({data}) => dayEventsRef.value = mapData(data))
    .catch(() => componentStateRef.value = 'error');

function mapData({value}: Ref<SportEventModel[] | null>) {
  if(value == null) {
    return [];
  }

  const dayEvents: dayEvents[] = [];

  value.map(event => {
    event.date = new Date(event.date);
    return event;
  }).forEach(event => {
    const {date} = event;
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const dayEvent = dayEvents.find(v => v.date.getTime() === day.getTime());
    if (dayEvent) {
      dayEvent.events.push(event);
    } else {
      dayEvents.push({
        date: day,
        events: [event]
      })
    }
  });

  componentStateRef.value = 'loaded';
  return dayEvents;
}

</script>

<style lang="scss" scoped>
@import "assets/styles/main";

.background {
  background-color: $sport-primary;
}

</style>