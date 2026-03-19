<template>
  <nav id="navMenu" aria-label="main navigation" class="navbar" role="navigation">
    <div class="navbar-brand is-vcentered is-flex is-align-items-center">
      <div class="level-item has-text-centered">
        <nuxt-link class="navbar-item" to="/">
          <img class="is-centered image logo" src="@/assets/images/svgs/logo-majske.svg"/>
        </nuxt-link>
      </div>
      <a :class="isMobileMenuActive" aria-expanded="false" aria-label="menu" class="navbar-burger" data-target="navMenu" role="button" @click="this.toggleMobileMenu()">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div :class="isMobileMenuActive" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <NuxtLink class="navbar-item" to="/prireditev">
            Prireditev
          </NuxtLink>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <NuxtLink class="navbar-item" to="/sport">
            Šport
          </NuxtLink>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <NuxtLink class="navbar-link" to="/zabava">
            Zabava
          </NuxtLink>
          <div class="navbar-dropdown">
            <NuxtLink class="navbar-item" to="/predmajski-spil">
              Predmajski špil
            </NuxtLink>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <NuxtLink class="navbar-item" to="/kultura">
            Kultura
          </NuxtLink>
        </div>
        <!-- <div class="navbar-item">
          <NuxtLink class="navbar-item" to="/info-tocka">
            Info točka
          </NuxtLink>
        </div> -->
        <div class="navbar-item has-dropdown is-hoverable">
          <NuxtLink class="navbar-item" to="/kontakt">
            Organizator & kontakt
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      activeMobileMenu: false
    };
  },
  methods: {
    toggleMobileMenu() {
      this.activeMobileMenu = !this.activeMobileMenu;
    }
  },
  computed: {
    isMobileMenuActive() {
      return this.activeMobileMenu ? 'is-active' : '';
    }
  },
  watch: {
    $route() {
      this.activeMobileMenu = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

nav {
  height: 6em;
}

.navbar {
  //background: linear-gradient(to bottom, rgba($primary, 0.45), transparent);
  background: $primary;
}

.logo {
  min-height: 5em;
}

.navbar-item,
.navbar-link {
  color: white;
}

a.navbar-item,
.navbar-link {
  transition: background 0.15s ease;

  &:hover:not(.router-link-active):not(.router-link-exact-active) {
    background: rgba(255, 255, 255, 0.08) !important;
    color: white !important;
  }

  &.router-link-active,
  &.router-link-exact-active {
    background: transparent !important;
    color: white !important;
    cursor: default;
    pointer-events: none;
  }
}

.navbar-item.has-dropdown:hover .navbar-link {
  background: rgba(255, 255, 255, 0.08) !important;
}

.navbar-dropdown {
  background: darken($primary, 6%);
  border-top: none !important;
  border-radius: 0 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  padding: 0.5em 0;
  min-width: 12em;

  .navbar-item {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9em;
    padding: 0.6em 1.25em;

    &:hover:not(.router-link-active):not(.router-link-exact-active) {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

.navbar-link {
  padding-right: 0.75rem !important;

  &::after {
    display: none !important;
  }
}
</style>
