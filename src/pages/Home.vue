<script lang="ts">
import { useUserStore } from '../store/modules/user'

export default{
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data: function(){
        return{
            name:"pal" as string
        }
    },
    beforeMount(){
        const user = this.userStore.getUser()
        this.name = `${user?.firstName} ${user?.lastName}`
    }
}
</script>
<template>
    <section v-if="name" class="section">
        <h1 class="is-size-1 has-text-weight-semibold">Hello {{name}}!</h1>
        <p class="is-size-5">Lorem ipsum</p>
    </section>
</template>
