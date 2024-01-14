<template>
  <div class="event-modal-wrapper">
    <CardImageComponent class="event-modal-content"
                        :content="props.description"
                        :imageUrl="props.imageUrl"
    >
      <template v-slot:title>
        <button @click="onModalClose()" class="button is-info is-small is-outlined">
          <i class="ri-arrow-left-line"></i>
          <span class="ml-2">Nazaj</span>
        </button>
        <h2 class="title is-6 has-text-infomb-0 pb-0">{{ dateFormatted }}</h2>
        <h1 class="title is-1 mt-0 pt-0 mb-2">{{ props.title }}</h1>
      </template>

      <template v-slot:subtitle>
        <div class="mb-4">
          <div v-if="props.location" class="content__header-row">
            <i class="ri-map-2-fill"></i>
            <div class="has-text-weight-bold">{{ props.location }}</div>
          </div>
          <div v-if="props.price" class="content__header-row">
            <i class="ri-money-euro-circle-fill"></i>
            <div class="has-text-weight-bold">{{ props.price }}</div>
          </div>
          <div v-if="props.teamFormation" class="content__header-row">
            <i class="ri-team-fill"></i>
            <div class="has-text-weight-bold">{{ props.teamFormation }}</div>
          </div>
        </div>
      </template>

      <template v-slot:links>
        <div class="flex justify-content--end">
          <a :href="props.registerLink" target="_blank" class="button is-primary mt-4">
            <i class="ri-edit-2-fill"></i>
            <span class="ml-2">Prijava</span>
          </a>
        </div>
      </template>

    </CardImageComponent>
  </div>
</template>

<script lang="ts" setup>
import {SportEventModel} from "~/models/events/sport-event.model";

const props = defineProps<SportEventModel>();
const emit = defineEmits(['closeModal']);
const {date} = toRefs(props);

const dateFormatted = computed(() =>
    `${date.value.toLocaleDateString('sl-SL', {weekday: 'long'})}, ${date.value.toLocaleDateString('sl-SL', {day: 'numeric', month: 'long', year: 'numeric'})}, ob ${date.value.toLocaleTimeString('sl-SL', {minute: '2-digit', hour: '2-digit'})}`);
const onModalClose = () => emit('closeModal');
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.event-modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  background: rgba($sport-dark, 0.45);
  backdrop-filter: blur(5px);
  min-height: 100vh;
  min-width: 100vw;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
<script setup lang="ts">
</script>