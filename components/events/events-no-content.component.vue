<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
    <div class="card" style="display: flex; flex-direction: column; align-items: center; padding: 2em">
      <h3 class="title is-3">{{title}}</h3>
      <p :class="contentClass">{{content}}</p>
    </div>
    <img :src="imageSrc" loading="lazy" style="height: 30vh"/>
  </div>
</template>

<script lang="ts" setup>

const props = withDefaults(defineProps<{
  title?: string;
  content?: string;
  type: 'sport' |'kultura' | 'zabava'
}>(), {
  type: "sport"
});

const {title, content, type} = toRefs(props);

const contentClass = computed(() => `has-text-${type.value}`)

const imageSrc = computed(() => {
  const baseUrl = '/img/';
  switch (type.value) {
    case 'sport':
      return `${baseUrl}sportko.svg`;
    case 'kultura':
      return `${baseUrl}kulturko.svg`;
    case 'zabava':
      return `${baseUrl}zabavko.svg`;
  }
})

</script>