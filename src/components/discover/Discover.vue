<template>
  <div class="discover">
    <header-tabs></header-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderTabs from "../headerTabs/HeaderTabs.vue";
export default {
  components: { HeaderTabs },
};
</script>

<style scoped>
</style>