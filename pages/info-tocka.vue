<template>
  <main v-if="contentData">
    <HeaderPageComponent
      :title="contentData.title"
      :subtitle="contentData.subtitle"
      :image-url="contentData.imageUrl"
    />

    <CardComponent class="mb-6" :content="contentData.description" />

    <section class="section__wrapper sport__wrapper pb-6">
      <CardImageComponent
        subtitle="Prijave na športne dogodke"
        :image-url="contentData.sportImage"
        :reversed="true"
      >
        <template #content>
          <div class="container mt-4">
            <ContentRendererMarkdown v-if="parsedContent.sportDescription" :value="parsedContent.sportDescription" />

            <div class="accordion mt-4">
              <article
                v-for="(step, index) in contentData.sportInfo.steps"
                :key="`sport-${index}-${step.title}`"
                class="accordion__item"
              >
                <button class="accordion__trigger" @click="toggleSection('sport', index)">
                  <span v-if="step.type === 'number'" class="accordion__badge">
                    <template v-if="step.type === 'number'">{{ index + 1 }}</template>
                  </span>
                  <span class="accordion__title">{{ step.title }}</span>
                  <i class="ri-arrow-down-s-line accordion__icon" :class="{ 'is-open': openPanels.sport === index }"></i>
                </button>
                <div v-if="openPanels.sport === index" class="accordion__content">
                  <ContentRendererMarkdown
                    v-if="parsedContent.sportSteps[index]"
                    :value="parsedContent.sportSteps[index]"
                  />
                </div>
              </article>

              <hr v-if="contentData.sportInfo.notes"/>

              <article v-if="contentData.sportInfo.notes" class="accordion__item">
                <div class="accordion__content help">
                  <ContentRendererMarkdown v-if="parsedContent.sportNotes" :value="parsedContent.sportNotes" />
                </div>
              </article>
            </div>
          </div>
        </template>
      </CardImageComponent>
    </section>

    <section class="section__wrapper culture__wrapper pb-6">
      <CardImageComponent
        subtitle="Prijave na kulturne otočke"
        :image-url="contentData.cultureImage"
      >
        <template #content>
          <div class="container mt-4">
            <ContentRendererMarkdown v-if="parsedContent.cultureDescription" :value="parsedContent.cultureDescription" />

            <div class="accordion mt-4">
              <article
                v-for="(step, index) in contentData.cultureInfo.steps"
                :key="`culture-${index}-${step.title}`"
                class="accordion__item"
              >
                <button class="accordion__trigger" @click="toggleSection('culture', index)">
                  <span v-if="step.type === 'number'" class="accordion__badge">{{ index + 1 }}
                  </span>
                  <span class="accordion__title">{{ step.title }}</span>
                  <i class="ri-arrow-down-s-line accordion__icon" :class="{ 'is-open': openPanels.culture === index }"></i>
                </button>
                <div v-if="openPanels.culture === index" class="accordion__content">
                  <ContentRendererMarkdown
                    v-if="parsedContent.cultureSteps[index]"
                    :value="parsedContent.cultureSteps[index]"
                  />
                </div>
              </article>

              <hr v-if="contentData.cultureInfo.notes"/>

              <article v-if="contentData.cultureInfo.notes" class="accordion__item">
                <div class="accordion__content help">
                  <ContentRendererMarkdown v-if="parsedContent.cultureNotes" :value="parsedContent.cultureNotes" />
                </div>
              </article>
            </div>
          </div>
        </template>
      </CardImageComponent>
    </section>

    <section class="section__wrapper concert__wrapper pb-6">
      <CardImageComponent
        subtitle="Plačilna kartica Majskih iger na zabavi"
        :image-url="contentData.concertImage"
        :reversed="true"
      >
        <template #content>
          <div class="container mt-4">
            <ContentRendererMarkdown v-if="parsedContent.concertDescription" :value="parsedContent.concertDescription" />

            <div class="accordion mt-4">
              <article
                v-for="(item, index) in contentData.concertInfo.info"
                :key="`concert-${index}-${item.title}`"
                class="accordion__item"
              >
                <button class="accordion__trigger" @click="toggleSection('concert', index)">
                  <span class="accordion__title">{{ item.title }}</span>
                  <i class="ri-arrow-down-s-line accordion__icon" :class="{ 'is-open': openPanels.concert === index }"></i>
                </button>
                <div v-if="openPanels.concert === index" class="accordion__content">
                  <ContentRendererMarkdown
                    v-if="parsedContent.concertItems[index]"
                    :value="parsedContent.concertItems[index]"
                  />
                </div>
              </article>

              <hr v-if="contentData.concertInfo.notes"/>

              <article v-if="contentData.concertInfo.notes" class="accordion__item">
                <div class="accordion__content help">
                  <ContentRendererMarkdown v-if="parsedContent.concertNotes" :value="parsedContent.concertNotes" />
                </div>
              </article>
            </div>
          </div>
        </template>
      </CardImageComponent>
    </section>
  </main>
</template>

<script setup lang="ts">
import { InfoPoint } from "~/models/info-point.model";
import { createSeoFunction } from "~/functions/create-seo.function";
import { parseMarkdown } from "~/utils/parseMarkdown";

const { data: contentData } = await useAsyncData('info-point', () =>
  queryContent<InfoPoint>('majske-igre/info-point').findOne()
)

const links = {
  sport: {
    title: 'Razpored športov',
    link: '/sport',
    buttonType: 'is-primary is-fullwidth'
  },
  culture: {
    title: 'Razpored kulture',
    link: '/kultura',
    buttonType: 'is-primary is-fullwidth'
  },
  concert: {
    title: 'Razpored zabave',
    link: '/zabava',
    buttonType: 'is-primary is-fullwidth'
  }
};

const openPanels = ref<{
  sport: number | null;
  culture: number | null;
  concert: number | null;
}>({
  sport: null,
  culture: null,
  concert: null
});

const parsedContent = ref<{
  sportDescription: any | null;
  sportSteps: any[];
  sportNotes: any | null;
  cultureDescription: any | null;
  cultureSteps: any[];
  cultureNotes: any | null;
  concertDescription: any | null;
  concertItems: any[];
  concertNotes: any | null;
}>({
  sportDescription: null,
  sportSteps: [],
  sportNotes: null,
  cultureDescription: null,
  cultureSteps: [],
  cultureNotes: null,
  concertDescription: null,
  concertItems: [],
  concertNotes: null
});

const toggleSection = (section: 'sport' | 'culture' | 'concert', index: number) => {
  openPanels.value[section] = openPanels.value[section] === index ? null : index;
};

watch(contentData, async (value) => {
  if (!value) {
    return;
  }

  parsedContent.value.sportDescription = await parseMarkdown(value.sportInfo.description);
  parsedContent.value.sportSteps = await Promise.all(
    value.sportInfo.steps.map(step => parseMarkdown(step.description))
  );
  parsedContent.value.sportNotes = await parseMarkdown(value.sportInfo.notes ?? '');

  parsedContent.value.cultureDescription = await parseMarkdown(value.cultureInfo.description);
  parsedContent.value.cultureSteps = await Promise.all(
    value.cultureInfo.steps.map(step => parseMarkdown(step.description))
  );
  parsedContent.value.cultureNotes = await parseMarkdown(value.cultureInfo.notes ?? '');

  parsedContent.value.concertDescription = await parseMarkdown(value.concertInfo.description);
  parsedContent.value.concertItems = await Promise.all(
    value.concertInfo.info.map(item => parseMarkdown(item.description))
  );
  parsedContent.value.concertNotes = await parseMarkdown(value.concertInfo.notes ?? '');
}, { immediate: true });

createSeoFunction({
  title: "Info točka - Majske igre",
  description: contentData.value?.description ?? '',
  imageUrl: contentData.value?.imageUrl ?? ''
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/main.scss";

.section {
  &__wrapper {
    margin-bottom: 2em;
  }
}

.accordion {
  display: flex;
  flex-direction: column;
  gap: 0.6em;

  &__item {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 1em;
    overflow: hidden;
  }

  &__trigger {
    width: 100%;
    border: 0;
    background: transparent;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75em;
    padding: 1em;

    &--static {
      cursor: default;
    }
  }

  &__badge {
    width: 2.1em;
    height: 2.1em;
    border-radius: 50%;
    background: $primary;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
  }

  &__title {
    font-weight: 700;
    color: $primary;
    flex: 1;
  }

  &__icon {
    color: $primary;
    font-size: 1.5em;
    transition: transform 0.2s ease;

    &.is-open {
      transform: rotate(180deg);
    }
  }

  &__content {
    padding: 0 1em 1em 1em;
  }
}

.sport {
  &__wrapper {
    background: $sport-primary;
  }
}

.culture {
  &__wrapper {
    background: $kultura-primary;
  }
}

.concert {
  &__wrapper {
    background: $zabava-primary;
  }
}
</style>