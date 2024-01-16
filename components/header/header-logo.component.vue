<template>
  <div class="background header__wrapper">
    <img class="header__image" :style="imageStyle" src="@/assets/images/svgs/logo-majske-bel.svg"/>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  imageStyle: {
    type: String
  }
});
</script>

<style lang="scss" scoped>
.header__wrapper {
  display: flex;
  justify-content: center;
  text-align: center;
}

.header__image {
  max-width: 50em;
}


</style>