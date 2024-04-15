<template>
  <HeaderLogoComponent class="background"/>
  <main v-if="componentStateRef === 'loaded'" class="background">
    <CardComponent v-if="descriptionRef != null" style="margin-bottom: 3em" :content="descriptionRef.description"/>

    <CardImageComponent
        v-if="showScheduleRef"
        v-for="(event, index) in cultureEventsRef"
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
    <EventsNoContentComponent v-else type="kultura" title="Kulturni otočki še samevajo" content="A ne za dolgo, spremljaj naša socialna omrežja in kmalu boš izvedel kdo jih bo napolnil!"/>
    <div v-if="descriptionRef?.additionalInfo" style="padding-bottom: 3em">
      <CardComponent :content="descriptionRef.additionalInfo"/>
    </div>
  </main>
  <ComponentStateErrorComponent class="background" v-if="componentStateRef === 'error'"/>
</template>

<script lang="ts" setup>
import {ComponentState} from "~/models/component-state.model";
import {DescriptionModel} from "~/models/description.model";
import {CultureEventModel, CultureSubEventModel} from "~/models/events/culture-event.model";
import {createSeoFunction} from "~/functions/create-seo.function";

const componentStateRef = ref<ComponentState>('loading');
const descriptionRef = ref<DescriptionModel | null>(null);
const cultureEventsRef = ref<any[]>([]);
const showScheduleRef = ref<boolean>(false);


useAsyncData('fetchDescription', () => queryContent<DescriptionModel>('descriptions/culture').findOne().then((res) => {
  descriptionRef.value = res;
  showScheduleRef.value = res.showSchedule;
  createSeoFunction({
    title: "Kultura - Majske igre",
    description: res.description,
    imageUrl: res.coverImage
  });
}));

useAsyncData('fetchCultureEvents', () => queryContent('culture-events').sort({date: 1}).find().then((data) => {
  cultureEventsRef.value = (data ?? []).map(v => {
    v.date = new Date(v.date).toLocaleDateString('sl-SL');
    parseMarkdown(v.description).then((d) => v.description = d);
    return v;
  });
  componentStateRef.value = 'loaded';
}));

</script>

<style lang="scss" scoped>
@import "assets/styles/main";

.background {
  background-color: $kultura-primary;
}

</style>
