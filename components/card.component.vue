<template>
  <div class="card card--no-radius p-4 py-6">
    <div class="container">
      <div v-if="title || subtitle" class="mb-5">
        <h1 v-if="title" :class="buildCssClass('title is-2 mb-0')">{{ title }}</h1>
        <h2 v-if="subtitle" :class="buildCssClass('title is-6 mt-2 has-text-primary')">{{ subtitle.toUpperCase() }}</h2>
      </div>
      <div v-if="content" class="content">
        <ContentRendererMarkdown  :value="content"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {parseMarkdown} from "~/utils/parseMarkdown";
import type {CardModel} from "~/models";

const props = withDefaults(defineProps<CardModel>(), {
  centeredTitles: false,
});

const {title, subtitle, centeredTitles} = toRefs(props);
const content = ref<string | null>(null);

parseMarkdown(props.content).then((parsed: string) => content.value = parsed);

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