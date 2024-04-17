<template>
  <div class="flex justify-content--center">
    <img :src="imageUrl" alt="event image" class="mt-4"/>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{ imageUrl: string }>();
const {imageUrl} = toRefs(props);
</script>

<style lang="scss" scoped>
img {
  max-height: 35vh;
}
</style>
