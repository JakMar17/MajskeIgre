<template>
  <h4 :ref="(el) => elementRef = el" @click="toggleDetails" class="has-text-info-dark is-clickable">{{ eventDate }} - {{ event.title }}</h4>
  <div v-if="showDetails" class="m-2">

    <div v-if="event.location || event.price || event.teamFormation" class="mb-3">
      <div v-if="event.location" class="header-row">
        <i class="ri-map-2-fill"></i>
        <span class="has-text-weight-bold">{{ event.location }}</span>
      </div>
      <div v-if="event.price" class="header-row">
        <i class="ri-money-euro-circle-fill"></i>
        <span class="has-text-weight-bold">{{ event.price }}</span>
      </div>
      <div v-if="event.teamFormation" class="header-row">
        <i class="ri-team-fill"></i>
        <span class="has-text-weight-bold">{{ event.teamFormation }}</span>
      </div>
      <div v-if="event.registerLink" class="header-row">
        <i class="ri-edit-line"></i>
        <span class="has-text-weight-bold">
          <a v-if="isRegisterLinkUrl" :href="event.registerLink" target="_blank">{{ event.registerLink }}</a>
          <span v-else>{{ event.registerLink }}</span>
        </span>
      </div>
      <div v-if="event.instructions" class="header-row is-clickable" @click="showModal = true">
        <i class="ri-file-list-line"></i>
        <span class="has-text-weight-bold has-text-primary" style="text-decoration: underline;">
          Navodila
        </span>
      </div>
    </div>

    <ContentRendererMarkdown v-if="parsedDescription" :value="parsedDescription"/>

    <div class="buttons mt-3">
      <a v-if="event.registerLink && isRegisterLinkUrl" :href="event.registerLink" target="_blank" class="button is-primary is-rounded is-fullwidth button-icon">
        <i class="ri-edit-line"></i>
        <span>Prijava</span>
      </a>
    </div>

    <EventsImageSubeventComponent v-if="event.imageUrl" :imageUrl="event.imageUrl"/>
    <MapComponent class="mt-2 mb-4" :geoLocation="event.geoLocation" :height="150"/>

    <EventsSportInstructionsModalComponent
      v-if="event.instructions"
      v-model="showModal"
      :title="event.title"
      :instructions="event.instructions"
      :imageUrl="event.imageUrl"
    />
  </div>
</template>

<script lang="ts" setup>

import {SportEventModel} from "~/models/events/sport-event.model";

const elementRef = ref(null);
const parsedDescription = ref<string | null>(null);
const showDetails = ref(false);
const showModal = ref(false);

const props = defineProps<{ event: SportEventModel }>();
const {event} = toRefs(props);

parseMarkdown(event.value.description).then((d) => parsedDescription.value = d);

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
  if (showDetails.value) {
    setTimeout(() => elementRef.value?.scrollIntoView({behavior: 'smooth'}), 100);
  }
}

const eventDate = computed(() => {
  const d = new Date(event.value.date);
  return d.toLocaleTimeString('sl-SI', {minute: 'numeric', hour: 'numeric'});
});

const isRegisterLinkUrl = computed(() => {
  try {
    return Boolean(new URL(event.value.registerLink));
  } catch {
    return false;
  }
});

</script>

<style lang="scss" scoped>
.header-row {
  display: flex;
  align-items: baseline;
  gap: 1em;
}

.button-icon {
  display: flex;
  align-items: center;
  gap: 0.5em;
  justify-content: center;
}
</style>
