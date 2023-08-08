<script lang="ts">
import { useUserStore } from '../../store/modules/user'
import User from '../../types/User'
import Organization from '../../types/Organization'
export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      organization: null as Organization | null,
      user: null as User | null,
      isActive:false as boolean,
      time:0 as number
    }
  },
  computed: {
    getAvatar() {
      return (store) => {
        if (store) {
            return `https://ui-avatars.com/api/?background=eb088c&color=FFFFFF&name=${encodeURIComponent(store?.name)}`
        }
        return 'https://ui-avatars.com/api/?background=eb088c&color=ffffff&name=Sin+Nombre'
      }
    }
  },
  mounted: function () {
    if(this.user){
      document.getElementsByTagName("html")[0].classList.add("has-navbar-fixed-top")
      this.inactivityTime()
    }
  }, 
  beforeMount() {
    this.user = this.userStore.getUser()
    this.organization=this.userStore.getStore()
  },
  methods: {
    inactivityTime: function(){
      window.onload = this.resetTimer
      document.onmousemove = this.resetTimer
      document.onkeydown = this.resetTimer
    },
    resetTimer: function() {
        clearTimeout(this.time)
        let mins = parseInt(import.meta.env.VITE_APP_REFRESH_TOKENS_MINS)
        mins=mins?mins:5
        this.time = window.setTimeout(this.signOutInactivity, mins * 60 * 1000)
    },
    toggleModal: function(){
      this.isActive = !this.isActive
    },
    signOutInactivity: function(){
      if(this.user){
        this.signOut()
      }
    },
    signOut: async function () {
      await this.userStore.signOut()
      window.location.href = '/'
    },
    toggleSidebar:function(){
      if(this.$parent){
        this.$parent['hideSidebar'] = !this.$parent['hideSidebar']
      }
    }
  },
}
</script>
<template>
  <header v-if="user">
    <nav id="navbar-main" class="navbar has-shadow is-fixed-top is-flex-touch is-align-items-center is-justify-content-space-between">
      <div class="navbar-start">
        <a @click.prevent="toggleSidebar" href="#" class="navbar-item pb-0 is-hidden-desktop">
          <span class="icon"><i class="material-symbols-outlined is-size-3">menu</i></span>
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item has-dropdown has-dropdown-with-icons has-divider has-user-avatar is-hoverable">
          <a @click.prevent="toggleModal" href="#" class="navbar-link is-arrowless is-flex is-align-items-center">
            <figure class="image">
              <img class="is-rounded" :src="getAvatar(organization)">
            </figure>
            <div class="is-flex ml-2"><span class="is-size-6">{{ user.orgs[0].name }}</span></div>
            <span class="icon"><i class="material-symbols-outlined">expand_more</i></span>
          </a>
          <div class="navbar-dropdown is-right" :class="{'is-hidden-touch':!isActive}">
            <a v-for="(org,n) in user.orgs" :key="n" class="navbar-item" href="#">
              <span class="icon-text">
                <span class="icon">
                  <figure class="image">
                  <img class="is-rounded" :src="getAvatar(org)">
                </figure>
                </span>
                <span>{{ org.name }}</span>
              </span>
            </a>
            <hr class="navbar-divider is-block">
            <a href="#" @click.prevent="signOut" class="navbar-item">
              <span class="icon-text">
                <span class="icon"><i class="material-symbols-outlined">logout</i></span>
                <span>Sign out</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
../../types/Organization