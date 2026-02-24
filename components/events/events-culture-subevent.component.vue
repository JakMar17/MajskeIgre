<template>
  <h4 :ref="(el) => elementRef = el" @click="toggleDetails" class="has-text-info-dark is-clickable">{{ event.time }} - {{ event.title }}</h4>
  <div v-if="showDetailsRef" class="m-2">

    <div v-if="event.location || event.price || event.registerLink" class="mb-3">
      <div v-if="event.location" class="content__header-row">
        <i class="ri-map-2-fill"></i>
        <div class="has-text-weight-bold">{{ event.location }}</div>
      </div>
      <div v-if="event.price" class="content__header-row">
        <i class="ri-money-euro-circle-fill"></i>
        <div class="has-text-weight-bold">{{ event.price }}</div>
      </div>
      <div v-if="event.registerLink" class="content__header-row">
        <i class="ri-edit-line"></i>
        <div class="has-text-weight-bold">
          <a :href="event.registerLink" target="_blank" v-if="isRegisterLinkValidUrl">
            {{ event.registerLink }}
          </a>
          <span v-else>{{ event.registerLink }}</span>
        </div>
      </div>
    </div>

    <ContentRendererMarkdown v-if="parsedDescriptionRef" :value="parsedDescriptionRef"/>
    <EventsImageSubeventComponent v-if="event.imageUrl" :imageUrl="event.imageUrl"/>
    <MapComponent :geoLocation="event.geoLocation"/>
  </div>
</template>

<script lang="ts" setup>

import {CultureSubEventModel} from "~/models/events/culture-event.model";

const elementRef = ref(null);

const parsedDescriptionRef = ref<string | null>(null);
const showDetailsRef = ref<boolean>(false);

const props = defineProps<{ event: CultureSubEventModel }>();
const {event} = toRefs(props);
console.log(event.value)

parseMarkdown(event.value.description).then((d) => parsedDescriptionRef.value = d);

const toggleDetails = () => {
  showDetailsRef.value = !showDetailsRef.value;
  if (showDetailsRef.value) {
    setTimeout(() => elementRef.value?.scrollIntoView({behavior: 'smooth'}), 100);
  }
}

const isRegisterLinkValidUrl = computed(() => {
  try {
    return Boolean(new URL(event.value.registerLink));
  } catch (e) {
    return false;
  }
});

</script>

<style lang="scss" scoped>

.content {
  &__header-row {
    display: flex;
    align-items: baseline;
    gap: 1em
  }
}
</style>