<template>
  <HeaderPageComponent title="Organizator" subtitle="Kdo sestavlja organizatorsko ekipo?"
    :image-url="coverImgRef ?? ''" />

  <CardComponent v-if="introRef" class="mb-6" :content="introRef"></CardComponent>

  <main class="container" style="display: flex; flex-wrap: wrap; gap: 3em; justify-content: center">
    <ContactCardComponent v-for="member of membersRef" :key="member.name" :name="member.name"
      :functionTitle="member.functionTitle" :phone="member.phone" :email="member.email" :imageUrl="member.imageUrl" />
  </main>

</template>
<script setup lang="ts">
import { MemberModel } from "~/models/member.model";
import { createSeoFunction } from "~/functions/create-seo.function";


// const fetchData = async () => {
//   const {intro, coverImg, members} = await queryContent('majske-igre/organizational-team').findOne()
//   introRef.value = intro;
//   coverImgRef.value = coverImg;
//   membersRef.value = members;

//   createSeoFunction({
//     title: "Organizacijska ekipa - Majske igre",
//     description: intro,
//     imageUrl: coverImg
//   });
// }

const { data: contentData } = await useAsyncData('organizational-team', () =>
  queryContent('majske-igre/organizational-team').findOne()
)

const introRef = computed(() => contentData.value?.intro ?? null)
const coverImgRef = computed(() => contentData.value?.coverImg ?? null)
const membersRef = computed(() => contentData.value?.members ?? null)

createSeoFunction({
  title: "Organizacijska ekipa - Majske igre",
  description: introRef.value ?? '',
  imageUrl: coverImgRef.value ?? ''
});
</script>
