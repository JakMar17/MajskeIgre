<template>
  <Teleport to="body">
    <div class="modal" :class="{ 'is-active': modelValue }">
      <div class="modal-background" @click="$emit('update:modelValue', false)"></div>
      <div class="modal-content modal-content--rounded">
        <div class="card card--image-clip">
          <div v-if="imageUrl" class="card-image">
            <figure class="image is-2by1">
              <img :src="imageUrl" alt="" style="object-fit: cover"/>
            </figure>
          </div>
          <div class="card-content">
            <h4 class="has-text-centered title has-text-weight-bold has-text-primary is-3 mb-0">{{ title }}</h4>
            <p class="has-text-centered is-size-7 has-text-grey is-uppercase mb-4" style="letter-spacing: 0.08em">Navodila</p>
            <ContentRendererMarkdown v-if="parsedInstructions" :value="parsedInstructions" class="markdown markdown--headers"/>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="zapri" @click="$emit('update:modelValue', false)"></button>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>

const props = defineProps<{
  modelValue: boolean;
  title: string;
  instructions: string;
  imageUrl?: string;
}>();

defineEmits<{ 'update:modelValue': [value: boolean] }>();

const parsedInstructions = ref<string | null>(null);
parseMarkdown(props.instructions).then((d) => parsedInstructions.value = d);

watch(() => props.modelValue, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

onUnmounted(() => {
  document.body.style.overflow = '';
});

</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

// border-radius on the scrolling container clips corners during scroll
.modal-content--rounded {
  border-radius: 1.25rem;
}

// overflow: hidden clips the top image into the card's rounded corners
.card--image-clip {
  overflow: hidden;
}

.markdown--headers {
  :deep(h1) { font-size: $size-4; font-weight: $weight-bold; margin-bottom: 0.5em; color: $primary; }
  :deep(h2) { font-size: $size-4; margin-bottom: 0.5em; color: $primary; }
  :deep(h3) { font-size: $size-5; font-weight: $weight-bold; margin-bottom: 0.5em; color: $primary; }
  :deep(h4) { font-size: $size-5; margin-bottom: 0.5em; color: $primary;}
  :deep(h5) { font-size: $size-6; font-weight: $weight-bold; margin-bottom: 0.5em; color: $primary; }
  :deep(h6) { font-size: $size-6; margin-bottom: 0.5em; color: $primary; }
}
</style>
