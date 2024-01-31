<template>
  <div id="library">
    <vNavBar/>
  </div>
</template>

<script>
import vNavBar from '@/components/vNavBar.vue'

export default {
  name: 'vLibrary',
  components: {
    vNavBar,
  }
}
</script>

<style scoped>
  #library {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }
</style>
