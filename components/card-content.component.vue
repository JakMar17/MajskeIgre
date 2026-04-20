<template>
  <div class="card card--no-radius p-4 py-6">
    <div class="container">
      <div v-if="title || subtitle" class="mb-5">
        <h1 v-if="title" :class="buildCssClass('title is-2 mb-0')">{{ title }}</h1>
        <h2 v-if="subtitle" :class="buildCssClass('title is-6 mt-2 has-text-primary')">{{ subtitle.toUpperCase() }}</h2>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {parseMarkdown} from "~/utils/parseMarkdown";
import type {CardModel} from "~/models";
import { CardContentModel } from "~/models/card-content.model";

const props = withDefaults(defineProps<CardContentModel>(), {
  centeredTitles: false,
});

const {title, subtitle, centeredTitles} = toRefs(props);
const content = ref<string | null>(null);

function buildCssClass(baseClass = "") {
  return `${baseClass} ${centeredTitles?.value ? "has-text-centered" : ""}`;
}

</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.card--no-radius {
  border-radius: 0 !important;
}
</style>