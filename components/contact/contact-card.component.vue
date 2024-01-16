<template>
  <div class="wrapper">
    <img loading="lazy" :src="imageUrl"/>
    <h2 class="title is-4">{{name}}</h2>
    <h3 class="subtitle is-6">{{functionTitle}}</h3>
    <div v-if="phone" class="contact-row">
      <i class="ri-phone-fill"></i>
      <span>{{phone}}</span>
    </div>
    <div v-if="email" class="contact-row">
      <i class="ri-mail-fill"></i>
      <a :href="'mailto:' + email">{{email}}</a>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {MemberModel} from "~/models/member.model";

const props = defineProps<MemberModel>();

const {name, functionTitle, phone, email, imageUrl} = toRefs(props);

</script>


<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.wrapper {
  @extend .card, .p-2;
  text-align: center;
  flex-basis: 100%;

  @media screen and (min-width: 425px) {
    flex-basis: 75%;
  }

  @media screen and (min-width: 576px) {
    flex-basis: 50%;
  }

  @media screen and (min-width: 768px) {
    flex-basis: 33%;
  }

  @media screen and (min-width: 1024px) {
    flex-basis: 25%;
  }
}

img {
  height: 15em;
  width: 15em;
  object-fit: contain;
}

.contact-row {
  display: flex;
  justify-content: center;
  gap: 2em;
}
</style>
<script setup lang="ts">
</script>