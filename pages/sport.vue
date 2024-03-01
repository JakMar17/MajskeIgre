<template>
  <HeaderLogoComponent class="background"/>
  <main v-if="componentStateRef === 'loaded'" class="background">
    <CardComponent v-if="descriptionRef != null" style="margin-bottom: 3em" :content="descriptionRef.description"/>

    <CardImageComponent v-for="(dayEvent, index) in dayEventsRef"
                        :key="index"
                        :imageUrl="getCoverImage(dayEvent)"
                        :title="getDayString(dayEvent.date)"
                        :reversed="index % 2 === 0"
    >
      <template v-slot:content>
        <div class="container mt-4">
          <EventsSportSubeventComponent v-for="e in dayEvent.events" :event="e"/>
        </div>
      </template>
    </CardImageComponent>
  </main>
  <ComponentStateErrorComponent class="background" v-if="componentStateRef === 'error'"/>
</template>

<script lang="ts" setup>

import {SportEventModel} from "~/models/events/sport-event.model";
import {Ref} from "vue";
import {ComponentState} from "~/models/component-state.model";
import {DescriptionModel} from "~/models/description.model";

const componentStateRef = ref<ComponentState>('loading');
const dayEventsRef= ref<dayEvents[]>([]);
const descriptionRef = ref<DescriptionModel | null>(null);

type dayEvents = {
  date: Date;
  events: SportEventModel[];
}

/**
 * Returns day string in format: Day, DD. Month YYYY
 * @param date date to format
 */
const getDayString = (date: Date) => {
  const dayOfWeek = date.toLocaleDateString('sl-SI', {weekday: 'long'});
  const monthLong = date.toLocaleDateString('sl-SI', {month: 'long'});
  const day = date.getDate();
  const year = date.getFullYear();

  return `${dayOfWeek.charAt(0).toUpperCase()}${dayOfWeek.slice(1)}, ${day}. ${monthLong} ${year}`;
}

/**
 * Returns cover image url for day event
 * @param dayEvent day event
 */
const getCoverImage = (dayEvent: dayEvents) => {
  for (const event of dayEvent.events) {
    if (event.imageUrl) {
      return event.imageUrl;
    }
  }
}

/**
 * Returns event start time in format: HH:MM
 * @param date date to format
 */
const getEventStartTime = ({date}: SportEventModel) =>
    new Date(date).toLocaleTimeString('sl-SL', {hour: '2-digit', minute: '2-digit'});

/**
 * Maps fetched data to sport events
 * @param value fetched data
 */
function mapSportEvents({value}: Ref<SportEventModel[] | null>) {
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

const onDescriptionFetch = (description: DescriptionModel) => {
  descriptionRef.value = description;
  useServerSeoMeta({
    title: "Šport - Majske igre",
    description: description.description,
    imageUrl: description.imageUrl,
    ogImageUrl: description.imageUrl,
    twitterCard: 'summary_large_image',
    ogTitle: "Šport - Majske igre",
  })
};

// data fetching
useAsyncData('fetchSportEvents', () => queryContent<SportEventModel>('sport-events').sort({date: 1}).find())
    .then(({data}) => dayEventsRef.value = mapSportEvents(data))
    .catch(() => componentStateRef.value = 'error');

useAsyncData('fetchDescription', () => queryContent<DescriptionModel>('descriptions/sport').findOne())
    .then(({data}) => onDescriptionFetch(data.value));


</script>

<style lang="scss" scoped>
@import "assets/styles/main";

.background {
  background-color: $sport-primary;
}

</style>