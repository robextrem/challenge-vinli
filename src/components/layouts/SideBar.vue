<script lang="ts">
import { useUserStore } from '../../store/modules/user'
import User from '../../types/User'

export default {
  props:{
    isHidden:{
      type:Boolean,
      default:true
    }
  },
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      mainuser: null as User | null,
      item: "home" as string,
    }
  },
  watch:{
    $route (to){
      if(to.name){
        if(to.name.includes("home"))
          this.item = "home"
        else if(to.name.includes("fleet"))
          this.item = "fleet"
      }
    }
  },
  mounted: function () {
    if(this.mainuser)
      document.getElementsByTagName("html")[0].classList.add("has-aside-left", "has-aside-expanded")

  }, 
  beforeMount() {
    this.mainuser = this.userStore.getUser()
  },
  methods:{
    toggleSidebar:function(){
      if(this.$parent){
        this.$parent['hideSidebar'] = !this.$parent['hideSidebar']
      }
    }
  }
}
</script>
<template>
    <aside v-if="mainuser" class="aside has-background-light has-shadow is-placed-left is-expanded" :class="{'is-block':!isHidden}">
      <a @click="toggleSidebar" class="delete is-hidden-desktop"></a>
      <div class="pl-5 pr-6 py-2 my-5">
        <figure class="image">
          <img src="src/assets/images/logo.png">
        </figure>
      </div>
      <div class="menu is-menu-main">
        <ul class="menu-list">
          <li>
            <router-link to="/home" :class="{'is-active':item=='home'}" class="is-inline-flex is-align-items-center has-text-weight-medium">
              <span class="icon"><i class="material-symbols-outlined">storefront</i></span>
              <span class="menu-item-label ml-3">Home</span>
            </router-link>
          </li>
          <li>
            <router-link to="/fleet" :class="{'is-active':item=='fleet'}" class="is-inline-flex is-align-items-center has-text-weight-medium">
              <span class="icon"><i class="material-symbols-outlined">local_shipping</i></span>
              <span class="menu-item-label ml-3">Fleet</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
</template>
