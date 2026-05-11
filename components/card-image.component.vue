<template>
  <div class="flex justify-content--center align-items--center">
    <section id="wrapper" ref="wrapper" class="wrapper">
      <div ref="content" :class="buildCssClass('content')">
        <div ref="content__card" class="content__card">
          <slot name="title">
            <h1 v-if="title" class="title is-2 mb-0">{{ title }}</h1>
          </slot>
          <slot name="subtitle">
            <h2 v-if="subtitle" class="title is-6 mt-2 has-text-primary">{{ subtitle.toUpperCase() }}</h2>
          </slot>
          <slot name="content">
            <ContentRendererMarkdown v-if="parsedContent" :value="parsedContent"/>
          </slot>
          <slot name="links">
            <div class="flex flex-wrap mt-4">
              <NuxtLink v-for="link in links" :key="link.title" :class="link.buttonType" :to="link.link" class="button">{{ link.title }}</NuxtLink>
            </div>
          </slot>
        </div>
      </div>
      <div v-if="imageUrl" :class="buildCssClass('background')">
        <img ref="backgroundImage" :src="imageUrl" loading="lazy"/>
      </div>
    </section>
  </div>
</template>

<script>
import {parseMarkdown} from "~/utils/parseMarkdown";

export default {
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String
    },
    imageUrl: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    reversed: {
      type: Boolean,
      default: false
    },
    links: {
      type: Array,
      default: () => []
    }
  },
  data() {
    parseMarkdown(this.content).then((parsed) => {
      this.parsedContent = parsed;
    });
    return {
      clientWidth: null,
      clientHeight: null,
      parsedContent: null,
      resizeObservable: null,
    }
  },
  mounted() {
    window.addEventListener("resize", () => this.onResize());
    this.resizeObservable = new ResizeObserver(() => this.onResize());
    this.resizeObservable.observe(this.$refs.content__card);
    this.onResize();
  },
  methods: {
    buildCssClass(baseClass = "") {
      return `${baseClass} ${this.reversed ? "reversed" : ""}`;
    },
    onResize() {
      const clientWidth = this.$refs.wrapper?.clientWidth ?? 0;
      const contentCardHeight = this.pxToEm(this.$refs.content__card?.offsetHeight);
      const imageHeight = this.pxToEm(this.$refs.backgroundImage?.offsetHeight);

      const wrapper = this.$refs.wrapper;
      if (!wrapper.style) {
        return;
      }

      wrapper.style.height = clientWidth <= 1024 ? `${contentCardHeight + imageHeight}em` : `${Math.max(contentCardHeight, 38)}em`;
    },
    pxToEm(px = 0) {
      const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      return px / fontSize;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.wrapper {
  position: relative;
  height: 38em;
  width: 100%;
  max-width: 128em;
  margin-bottom: 2em;

  @media only screen and (min-width: 1024px) {
    margin-bottom: 0;
  }
}

.content {
  z-index: 2;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  inset: 0;
  width: 100%;
  box-sizing: border-box;

  @media only screen and (min-width: 768px) {
    padding-left: 4em;
    padding-right: 4em;
  }

  @media only screen and (min-width: 1024px) {
    align-items: center;
  }

  &__card {
    @extend .card;
    padding: 2em;

    border-radius: 0 0 1em 1em;

    position: relative;

    @media only screen and (min-width: 1024px) {
      border-radius: 1em;
      width: min(100%, 56rem);
    }

    @media only screen and (min-width: 1024px) and (max-width: 1440px) {
      width: 100%;
    }
  }
}

.content.reversed {
  @media only screen and (min-width: 1024px) {
    justify-content: flex-end;
  }
}

.background {
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;

  margin-bottom: 4em;

  @media only screen and (min-width: 768px) {
    padding-left: 4em;
    padding-right: 4em;
  }

  @media only screen and (min-width: 1024px) {
    margin-bottom: 0;
    justify-content: flex-end;
    align-items: center;
  }

  img {
    object-fit: cover;
    height: 35em;
    width: auto;
    max-width: 100%;
    display: block;
    border-radius: 1em 1em 0 0;

    @media only screen and (min-width: 1024px) {
      width: min(100%, 64rem);
      border-radius: 1em;
    }
  }
}

.background.reversed {
  @media only screen and (min-width: 1024px) {
    justify-content: flex-start;
  }
}
</style>
<script lang="ts" setup>
</script>
