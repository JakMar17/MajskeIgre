<template>
  <div :ref="(el) => elementRef = el as HTMLElement | null">
    <component
        :is="titleTag"
        @click="toggle"
        class="performer__title is-clickable has-text-centered"
    >{{ performer.name }}</component>
    <div v-if="expanded" class="performer__details m-2">
      <p v-if="performer.description" class="mb-3 has-text-centered">{{ performer.description }}</p>
      <EventsImageSubeventComponent v-if="performer.imageUrl" :imageUrl="performer.imageUrl"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PerformerModel} from "~/models/events/concert-event.model";

const props = defineProps<{ performer: PerformerModel; expanded: boolean }>();
const emit = defineEmits<{ (e: 'toggle'): void }>();
const {performer, expanded} = toRefs(props);

const elementRef = ref<HTMLElement | null>(null);

const titleTag = computed(() => {
  switch (performer.value.size) {
    case 'veliki': return 'h1';
    case 'srednji': return 'h2';
    case 'majhni': return 'h3';
    default: return 'h3';
  }
});

const toggle = () => {
  emit('toggle');
  if (!expanded.value) {
    setTimeout(() => elementRef.value?.scrollIntoView({behavior: 'smooth'}), 100);
  }
};
</script>

<style lang="scss" scoped>
.performer__title {
  &:hover {
    opacity: 0.8;
  }
}

.performer__details {
  img {
    max-height: 35vh;
  }
}
</style>


<style lang="scss" scoped>
.performer__title {
  &:hover {
    opacity: 0.8;
  }
}

.performer__details {
  img {
    max-height: 35vh;
  }
}
</style>
