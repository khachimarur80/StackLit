<template>
  <div id="leaderboard">
    <vNavBar/>
  </div>
</template>

<script>
import vNavBar from '@/components/vNavBar.vue'

export default {
  name: 'LeaderBoard',
  components: {
    vNavBar,
  }
}
</script>

<style scoped>
  #leaderboard {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }
</style>
