<template>
  <ModalCardImageComponent v-if="modalEventRef" v-bind="modalEventRef" @close-modal="onEventSelected(null)"></ModalCardImageComponent>
  <main class="wrapper">
    <HeaderLogoComponent/>
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
            <a v-on:click="onEventSelected(event)" class="title is-5 has-text-link">{{ getEventStartTime(event) }} - {{ event.title }}</a>
          </h4>
        </div>
      </template>
    </CardImageComponent>
  </main>
</template>

<script lang="ts" setup>

import {SportEventModel} from "~/models/events/sport-event.model";

const dayEventsRef: ref<dayEvents[]> = ref([]);
const modalEventRef: ref<SportEventModel | null> = ref(null);

type dayEvents = {
  date: Date;
  events: SportEventModel[];
}

const onEventSelected = (event: SportEventModel | null) => {
  modalEventRef.value = event;
}

const fetchData = async () => {
  const data = (await queryContent('sport-events').sort({date: 1}).find()).map(event => {
    event.date = new Date(event.date);
    return event;
  });
  const dayEvents: dayEvents[] = [];

  data.forEach(event => {
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

  return dayEvents;
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


fetchData().then(val => dayEventsRef.value = val);

</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.wrapper {
  background: $sport-primary;
}

</style>