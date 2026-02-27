<template>
  <div class="wrapper">
    <div class="content">
      <div></div>
      <div class="content__main">
        <img id="majske_logo" alt="logo" src="../../assets/images/svgs/logo-majske.svg"/>

        <div class="posastko__row">
          <NuxtLink to="/sport" id="sportko" class="posastko__wrapper">
            <div>
              <img id="sportko-static" class="posastko__img" alt="logo" src="../../assets/images/majske-igre/sportko.svg"/>
              <img id="sportko-gif" class="posastko__img" alt="logo" src="../../assets/images/gifs/sport_gif.gif"/>
            </div>
            <h2 class="title is-5 m-0">Šport</h2>
          </NuxtLink>
          <NuxtLink to="/zabava" id="zabavko" class="posastko__wrapper">
            <img id="zabavko-static" class="posastko__img" alt="logo" src="../../assets/images/majske-igre/zabavko.svg"/>
            <img id="zabavko-gif" class="posastko__img" alt="logo" src="../../assets/images/gifs/zabavko_gif.gif"/>
            <h2 class="title is-5 m-0">Zabava</h2>
          </NuxtLink>
          <NuxtLink to="/kultura" id="kulturko" class="posastko__wrapper">
            <img id="kulturko-static" class="posastko__img" alt="logo" src="../../assets/images/majske-igre/kulturko.svg"/>
            <img id="kulturko-gif" class="posastko__img" alt="logo" src="../../assets/images/gifs/kulturko_gif.gif"/>
            <h2 class="title is-5 m-0">Kultura</h2>
          </NuxtLink>
        </div>

        <div class="menu">
          <NuxtLink to="/prireditev">O prireditvi</NuxtLink>
          <NuxtLink to="/info-tocka">Info točka</NuxtLink>
          <NuxtLink to="/kontakt">Organizator & kontakt</NuxtLink>
        </div>

        <hr/>
        <div class="social">
          <a href="https://www.facebook.com/majskeigre" target="_blank" title="Majske igre"><i class="ri-facebook-circle-fill" style="color: white; font-size: 2em"></i></a>
          <a href="https://www.instagram.com/majskeigre" target="_blank" title="Majske igre"><i class="ri-instagram-fill" style="color: white; font-size: 2em"></i></a>
        </div>

      </div>
      <NuxtLink to="https://ssvets.si">
        <img style="height: 5em" alt="logo" src="../../assets/images/svgs/logo-sss.svg"/>
      </NuxtLink>


    </div>


    <img :src="backgroundSrc" alt="background" class="background" loading="lazy"/>
  </div>
</template>

<script lang="ts" setup>
const images = defineProps<{ imageUrls: Array<{images: {}}> }>();
const backgroundSrc = ref('');
const backgroundSrcIndex = ref(0);

const imageUrls = computed(() => {
  return images.imageUrls.images.map(img => img.image)
});

const setImageInterval = () =>
  setInterval(() => {
    backgroundSrcIndex.value++;
    backgroundSrc.value = imageUrls.value[backgroundSrcIndex.value % imageUrls.value.length];
  }, 5000);

onMounted(() => {
  if (imageUrls.value.length > 0) {
    backgroundSrc.value = imageUrls.value[0];
    setImageInterval();
  }
});


</script>

<!--<script>-->
<!--export default {-->
<!--  async setup() {-->
<!--    const {data} = await useAsyncData('slideshow', async () => (await queryContent('slideshow').where({title: 'index'}).findOne()));-->
<!--    const imageUrls = data.value.images.map(img => img.image);-->
<!--    return {imageUrls}-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      backgroundSrc: '',-->
<!--      backgroundSrcIndex: 0,-->
<!--      imageUrls: []-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    if (this.imageUrls.length > 0) {-->
<!--      this.backgroundSrc = this.imageUrls[0];-->
<!--      this.setImageInterval();-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    setImageInterval() {-->
<!--      setInterval(() => {-->
<!--        this.backgroundSrcIndex++;-->
<!--        this.backgroundSrc = this.imageUrls[this.backgroundSrcIndex % this.imageUrls.length];-->
<!--      }, 5000)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="scss" scoped>
@import "assets/styles/main";

hr {
  background: white;
  width: 75%;
  margin: 1rem 0;
}

.wrapper {
  position: relative;
  z-index: 20;
}

.content {
  z-index: 200;
  position: absolute;
  background: rgba($neutral, 0.25);
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &__main {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .title {
    @extend .title, .is-1, .text__has-shadow;
    text-align: center;
    color: white;
    margin-top: 2rem;
  }

  .social {
    display: flex;
    gap: 1em;
  }
}

#majske_logo {
  height: 20rem;
  object-fit: contain;
}

.background {
  transition: opacity 0.5s;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
}

.menu {
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
  margin: 0 3vw;
  justify-content: space-around;

  a {
    @extend .text__has-shadow;
    font-size: 1.5em;
    text-align: center;
    color: white;

    transition: text-decoration-color 0.125s ease-in;

    &:hover {
      text-decoration: underline white;
    }
  }
}

.text {
  &__has-shadow {
    text-decoration-color: transparent;
    text-shadow: 0.15rem 0.15rem 0.25rem rgba(0, 0, 0, 0.75);
  }
}

.posastko {
  &__wrapper {
    width: fit-content;
    transition: transform .4s;

    &:hover {
      transform: scale(1.5);

      padding: 2em;
      border-radius: 1em;
    }
  }

  &__img {
    height: 8em;
    width: auto;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2em;
    gap: 2em;
  }
}

#kulturko-gif {
  display: none;
}

#zabavko-gif {
  display: none;
}

#sportko-gif {
  display: none;
}

#kulturko:hover {
  background: $kultura-dark;

  #kulturko-static {
    display: none;
  }

  #kulturko-gif {
    display: block;
  }
}


#zabavko:hover {
  background: $zabava-dark;

  #zabavko-static {
    display: none;
  }

  #zabavko-gif {
    display: block;
  }
}

#sportko:hover {
  background: $sport-dark;

  #sportko-static {
    display: none;
  }

  #sportko-gif {
    display: block;
  }
}

</style>