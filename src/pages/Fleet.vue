<script lang="ts">
import FleetList from '../components/fleet/FleetList.vue'
export default {
    components:{
        FleetList
    }
}
</script>
<template>
    <section class="section">
        <h1 class="is-size-1 has-text-weight-semibold mb-3">Fleet</h1>
        <fleet-list></fleet-list>
    </section>
</template>
