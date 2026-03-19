<template>
  <main v-if="contentData" class="background">
    <HeaderPageComponent
      :title="contentData.title"
      :subtitle="contentData.subtitle"
      :image-url="contentData.imageUrl"
    />

    <CardComponent class="mb-6" :content="contentData.description" />

    <section class="p-4 has-text-centered has-background-white">
      
     <h1 class="title is-1 mb-2">Predmajski špil 2026</h1>
          <h2 class="title is-6">{{ contentData.eventLocation }} - {{ contentData.eventDate }}</h2>
    </section>

    <!-- Performing groups -->
    <section class="groups__wrapper pb-4">
      <template v-if="contentData.groups && contentData.groups.length > 0">
        <CardImageComponent
          v-for="(group, index) in contentData.groups"
          :key="index"
          :image-url="group.imageUrl"
          :reversed="index % 2 !== 0"
        >
          <template #title>
            <h1 class="title is-2 mb-1">{{ group.name }}</h1>
          </template>
          <template #content>
            <div class="container mt-2">
              <ContentRendererMarkdown v-if="parsedGroups[index]" :value="parsedGroups[index]" />
            </div>
          </template>
        </CardImageComponent>
      </template>
      <div v-else class="groups__empty">
        <i class="ri-music-2-line groups__empty-icon"></i>
        <p>Nastopajoči še niso znani, ko bodo, se bodo pojavili tukaj. Do takrat spremljaj naša socialna omrežja za najnovejše informacije.</p>
      </div>
    </section>

    <!-- Stage path stepper -->
    <section class="stage-path__wrapper">
      <div class="stage-path__spotlight"></div>
      <div class="container stage-path__container">
        <h2 class="stage-path__title">
          <i class="ri-trophy-line mr-2"></i>Pot na oder Majskih iger
        </h2>
        <p class="stage-path__subtitle">{{ contentData.eventDescription }}</p>

        <div class="accordion mt-6">
          <article
            v-for="(step, index) in contentData.steps"
            :key="`step-${index}`"
            class="accordion__item"
          >
            <button class="accordion__trigger" @click="toggleStep(index)">
              <span class="accordion__badge">{{ index + 1 }}</span>
              <span class="accordion__title">{{ step.title }}</span>
              <i
                class="ri-arrow-down-s-line accordion__icon"
                :class="{ 'is-open': openStep === index }"
              ></i>
            </button>
            <Transition name="accordion">
              <div v-if="openStep === index" class="accordion__content">
                <p>{{ step.description }}</p>
              </div>
            </Transition>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { PredmajskiSpil } from "~/models/predmajski-spil.model";
import { createSeoFunction } from "~/functions/create-seo.function";
import { parseMarkdown } from "~/utils/parseMarkdown";

const { data: contentData } = await useAsyncData("predmajski-spil", () =>
  queryContent<PredmajskiSpil>("predmajski-spil/predmajski-spil").findOne()
);

const openStep = ref<number | null>(null);
const parsedGroups = ref<any[]>([]);

const toggleStep = (index: number) => {
  openStep.value = openStep.value === index ? null : index;
};

watch(
  contentData,
  async (value) => {
    if (!value) return;
    parsedGroups.value = await Promise.all(
      value.groups.map((group) => parseMarkdown(group.description))
    );
  },
  { immediate: true }
);

createSeoFunction({
  title: "Predmajski špil - Majske igre",
  description: contentData.value?.description ?? "",
  imageUrl: contentData.value?.imageUrl ?? "",
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/main.scss";

$predmajski-accent: rgba(255, 210, 80, 1);
$predmajski-accent-glow: rgba(255, 210, 80, 0.35);

.background {
  background: linear-gradient(160deg, $zabava-primary 0%, $zabava-dark 100%);
  min-height: 100vh;
}

// Event info bar
.event-info {
  &__wrapper {
    padding: 2em 1em;
    margin-bottom: 1em;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5em;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3em;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 1em;
    padding: 1.2em 2em;
    min-width: 10em;
    color: white;
  }

  &__icon {
    font-size: 2em;
    color: $predmajski-accent;
    filter: drop-shadow(0 0 6px $predmajski-accent-glow);
  }

  &__label {
    font-size: 0.75em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.75;
  }

  &__value {
    font-size: 1.1em;
    font-weight: 700;
  }
}

// Groups section
.groups {
  &__wrapper {
    margin-bottom: 2em;
  }

  &__title {
    font-size: 1.8em;
    font-weight: 700;
    color: white;
    margin-bottom: 1em;
    display: flex;
    align-items: center;

    i {
      color: $predmajski-accent;
      filter: drop-shadow(0 0 6px $predmajski-accent-glow);
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75em;
    padding: 3em 1em;
    color: rgba(255, 255, 255, 0.6);
    font-size: 1em;
    text-align: center;
  }

  &__empty-icon {
    font-size: 2.5em;
    opacity: 0.5;
  }
}

// Stage path stepper
.stage-path {
  &__wrapper {
    position: relative;
    padding: 4em 1em;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.2);
  }

  &__spotlight {
    position: absolute;
    top: -6em;
    left: 50%;
    transform: translateX(-50%);
    width: 60vw;
    height: 30em;
    background: radial-gradient(ellipse at top, rgba(255, 210, 80, 0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  &__container {
    position: relative;
    z-index: 1;
  }

  &__title {
    font-size: 1.8em;
    font-weight: 700;
    color: white;
    margin-bottom: 0.4em;
    display: flex;
    align-items: center;

    i {
      color: $predmajski-accent;
      filter: drop-shadow(0 0 8px $predmajski-accent-glow);
    }
  }

  &__subtitle {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1em;
    margin-bottom: 0;
  }
}

// Accordion
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
  }

  &__badge {
    width: 2.4em;
    height: 2.4em;
    border-radius: 50%;
    background: $zabava-dark;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1em;
    flex-shrink: 0;
  }

  &__title {
    font-weight: 700;
    color: $primary;
    flex: 1;
    font-size: 1.05em;
  }

  &__icon {
    color: $zabava-dark;
    font-size: 1.5em;
    transition: transform 0.2s ease;

    &.is-open {
      transform: rotate(180deg);
    }
  }

  &__content {
    padding: 0 1em 1em 1em;
    padding-left: calc(1em + 2.4em + 0.75em);
    color: $primary;
    line-height: 1.7;
  }
}

// Accordion transition
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: 300px;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
