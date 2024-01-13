<template>
  <HeaderPageComponent
      title="Organizacijska ekipa"
      subtitle="Kdo smo in naš kontakt"
      image-url="https://scontent.flju1-1.fna.fbcdn.net/v/t39.30808-6/344862419_6226402214120450_363653582513613943_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a73e89&_nc_ohc=ucHDFcOEyosAX_Y72cK&_nc_ht=scontent.flju1-1.fna&oh=00_AfAaz_f1dfaVRkMDziAx8phJKsFFBL2QJFqnu1-Hh2qcOg&oe=65A78BC8"
  />

  <CardComponent v-if="introRef" class="mb-6" :content="introRef"></CardComponent>

  <main class="container" style="display: flex; flex-wrap: wrap; gap: 3em; justify-content: center">
    <ContactCardComponent v-for="member of membersRef" :key="member.name" :name="member.name" :functionTitle="member.functionTitle" :phone="member.phone" :email="member.email" :imageUrl="member.imageUrl"/>
  </main>

</template>
<script setup lang="ts">
import {MemberModel} from "~/models/member.model";

const introRef = ref<string | null>(null);
const membersRef = ref<MemberModel[] | null>(null);


const fetchData = async () => {
  const {intro, members} = await queryContent('majske-igre/organizational-team').findOne()
  introRef.value = intro;
  membersRef.value = members;
}

fetchData();
</script>