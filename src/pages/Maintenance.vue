<script lang="ts">
import { useUserStore } from '../store/modules/user'
export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  beforeMount() {
    this.userStore.signOut()
  }
}
</script>
<template>
  <section class="hero is-fullheight is-relatie" id="maintenance">
    <div class="hero-body has-text-centered">
      <div class="container">
        <div class="is-flex is-justify-content-center">
            <figure class="image is-128x128 mb-5">
              <img src="/src/assets/images/logo-iso.png"/>
            </figure>
        </div>
        <h1 class="has-text-link has-text-weight-bold is-size-1 title mb-4 is-uppercase">We are on maintainance</h1>
      </div>
    </div>
  </section>
</template>