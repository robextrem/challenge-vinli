<script lang="ts">
import { useUserStore } from '../store/modules/user'
export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data: function () {
    return {
      email: '' as string,
      password: '' as string,
      errorMessage: '' as string,
      isLoading: false as boolean,
      isLogged: true as boolean,
      inputPasswordType:'password' as string,
      iconPassword:'visibility' as string,
    }
  },
  watch: {
    email: function(){
      this.email = this.email.toLowerCase()
    }
  },
  beforeMount() {
   this.redirectIfNotLogged()
  },
  methods: {
    redirectIfNotLogged: async function(){
      if (this.userStore?.user) {
        this.$router.push({ path: '/home' })
      }else{
        this.isLogged=false
      }
    },
    toggleInputPassword: function(){
      this.inputPasswordType = (this.inputPasswordType=="password")?"text":"password"
      this.iconPassword = (this.inputPasswordType=="password")?"visibility":"visibility_off"
    },
    submitComponent: function () {
      this.isLoading = true
      this.errorMessage = ''
      this.userStore.signIn(this.email, this.password)
      .then(() => {
        window.location.reload()
        this.isLogged = true
        this.isLoading = false
      })
      .catch((error) => {
        this.isLoading = false
        this.errorMessage = error.response.data.text
      })
    },
  },
}
</script>
<template>
  <section :class="{'is-hidden': isLogged}" class="hero is-fullheight">
    <div class="is-flex is-flex-grow-1 is-flex-shrink-0 is-align-items-stretch">
      <div id="login-bg" class="logged-out-screen is-hidden-mobile is-flex-1 is-flex is-align-items-center is-justify-content-center has-background-link">
      </div>
      <div class="is-flex-1 is-flex is-align-items-center is-justify-content-center has-background-white">
        <div class="p-5">
          <h1 class="is-size-1 mb-0 has-text-centered has-text-weight-bold has-text-dark">Welcome to Vinli</h1>
          <p class="is-size-6 has-text-centered has-text-dark mb-4">Sign in with your email and password</p>
          <div class="is-flex is-justify-content-center mb-5">
            <figure class="image is-144x144">
              <img src="/src/assets/images/logo-iso.png">
            </figure>
          </div>
          <div class="is-clearfix"></div>
          <form name="form-login" method="post" @submit.prevent="submitComponent">
            <div class="field mb-5">
              <label class="label" for="email">E-mail:</label>
              <div class="control">
                <input v-model="email" class="input" type="email" name="email" required placeholder="Email address"/>
              </div>
            </div>
            <div class="field">
              <label class="label" for="email">Password:</label>
              <div class="control has-icons-over">
                <input v-model="password" class="input" name="password" :type="inputPasswordType" required placeholder="Password"/>
                <span @click.prevent="toggleInputPassword" class="icon is-small is-right has-text-dark">
                  <i class="material-symbols-outlined">{{ iconPassword }}</i>
                </span>
              </div>
            </div>
              <div v-if="errorMessage" class="has-text-danger has-text-centered help">
                  {{ errorMessage }}
              </div>
            <div class="buttons my-5 is-centered">
              <button :class="{ 'is-loading': isLoading }" class="button is-link is-fullwidth has-text-weight-semibold" type="submit" id="signin-button">Sign in</button>
            </div>
            <p class="has-text-centered is-size-7">
              Don't have an account? <a class="has-text-weight-bold" target="_blank" href="#">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
