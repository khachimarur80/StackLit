<template>
  <div id="home">
    <vNavBar/>
    <vHero/>
  </div>
</template>

<script>
import vNavBar from '@/components/vNavBar.vue'
import vHero from '@/components/vHero.vue'

export default {
  name: 'vHome',
  components: {
    vNavBar,
    vHero
  }
}
</script>

<style scoped>
  #home {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }
</style>
