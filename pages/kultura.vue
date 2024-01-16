<template>
  <HeaderLogoComponent class="background"/>
  <main v-if="componentStateRef === 'loaded'" class="background">
    <CardComponent v-if="descriptionRef != null" style="margin-bottom: 3em" :content="descriptionRef.description"/>

    <CardImageComponent v-for="(event, index) in cultureEventsRef"
                        :key="index"
                        :imageUrl="event.imageUrl"
                        :title="`${event.date} | ${event.title.toUpperCase()}`"
                        :reversed="index % 2 === 0"
    >

      <template v-slot:title>
        <h2 class="title is-6 has-text-info mb-0 pb-0">{{ event.date }}</h2>
        <h1 class="title is-1 mt-0 pt-0 mb-2">{{ event.title }}</h1>
      </template>
      <template v-slot:content>
        <div class="container mt-4">
          <EventsCultureSubeventComponent v-for="e in event.events" :event="e"/>
        </div>
      </template>
    </CardImageComponent>
  </main>
  <ComponentStateLoadingComponent class="background" v-if="componentStateRef === 'loading'"/>
  <ComponentStateErrorComponent class="background" v-if="componentStateRef === 'error'"/>
</template>

<script lang="ts" setup>
import {ComponentState} from "~/models/component-state.model";
import {DescriptionModel} from "~/models/description.model";
import {CultureEventModel} from "~/models/events/culture-event.model";

const componentStateRef = ref<ComponentState>('loading');
const descriptionRef = ref<DescriptionModel | null>(null);
const cultureEventsRef = ref<CultureEventModel[]>([]);

const xxx = (c) => parseMarkdown(c);

// data fetching
useAsyncData('fetchCultureEvents', () => queryContent<CultureEventModel>('culture-events').sort({date: 1}).find())
    .then(({data}) => {
      cultureEventsRef.value = (data.value ?? []).map(v => {
        v.date = new Date(v.date).toLocaleDateString('sl-SL');
        parseMarkdown(v.description).then((d) => v.description = d);
        return v;
      });
      componentStateRef.value = 'loaded';
    });

useAsyncData('fetchDescription', () => queryContent<DescriptionModel>('descriptions/culture').findOne()).then(({data}) => {
  descriptionRef.value = data.value;
});


</script>

<style lang="scss" scoped>
@import "assets/styles/main";

.background {
  background-color: $kultura-primary;
}

</style>