<template>
  <footer class="footer is-success">
    <div class="content has-text-centered is-success">

      <div class="columns is-centered">
        <div class="column mt-6">
          <hr class="is-hidden-touch"/>
          <div class="has-text-centered is-centered">
            <img style="height: 5em" src="@/assets/images/svgs/logo-sss.svg"/>
            <div class="title is-6">Študentski svet stanovalcev</div>
            <div class="pb-0 button__icon">
              <i class="ri-home-3-fill"></i>
              <span>Svetčeva 9 1000 Ljubljana</span>
            </div>
            <a href="https://ssvets.si" target="_blank" class="button is-ghost button__icon">
              <i class="ri-ie-fill"></i>
              <span>www.ssvets.si</span>
            </a>
          </div>
        </div>
        <div class="column is-narrow">
          <img class="img__logo" src="@/assets/images/svgs/logo-majske-crn.svg"/>

           <div v-if="appLinks?.googlePlayStore || appLinks?.appleAppStore" class="buttons is-centered">
             <a v-if="appLinks?.appleAppStore" :href="appLinks.appleAppStore" target="_blank" class="button is-primary is-outlined is-rounded button__icon">
               <span class="icon"><i class="ri-apple-fill"></i></span>
               <span>App Store</span>
             </a>
            <a v-if="appLinks?.googlePlayStore" :href="appLinks.googlePlayStore" target="_blank" class="button is-primary is-outlined is-rounded button__icon">
              <span class="icon"><i class="ri-google-play-fill"></i></span>
              <span>Google Play</span>
            </a>
          </div>
        </div>
        <div class="column mt-6">
          <hr class="is-hidden-touch"/>
          <div class="is-centered mb-0">
            <a href="https://www.facebook.com/majskeigre" target="_blank" class="button is-ghost button__icon">
              <span>
                <i class="ri-facebook-circle-fill"></i>
              </span>
              <span>Facebook</span>
            </a>
            <a href="https://www.instagram.com/majskeigre/" target="_blank" class="button is-ghost button__icon">
              <span class="icon">
                <i class="ri-instagram-fill"></i>
              </span>
              <span>Instagram</span>
            </a>
          </div>
          <a href="https://www.tiktok.com/@majskeigre" target="_blank" class="button is-ghost button__icon">
            <i class="ri-tiktok-fill"></i>
            <span>TikTok</span>
          </a>
        </div>
      </div>
      <div class="m-0 p-0">© 2024 Študentski svet stanovalcev</div>
      <div class="help m-0 p-0">Vse pravice pridržane.</div>
      <div class="help m-0 p-0">
        <NuxtLink to="/zasebnost" class="has-text-dark">Politika zasebnosti</NuxtLink>
      </div>
      <em class="help m-0 p-0">Create with ♥️ by <a href="https://jakob.marela.team/?utm_source=majske-igre&utm_medium=footerSignature&utm_campaign=footerSignature">JakMar17</a></em>
    </div>
  </footer>
</template>


<style lang="scss" scoped>
footer {
  margin-top: 1em;
}

hr {
  background: black;
  margin: 0;
  margin-bottom: 2em;
}

.img__logo {
  max-height: 10em;
  width: 15em;
}

.button__icon {
  display: flex;
  align-items: center;
  gap: 0.5em;
  justify-content: center;
}
</style>
<script setup lang="ts">
import type { AppLinksModel } from '~/models';

const { data: appLinks } = await useAsyncData<AppLinksModel>('fetchAppLinks', () =>
  queryContent<AppLinksModel>('descriptions/app-links').findOne()
);
</script>
