<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    theme: {
      primary: "#1BE0A1",
      secondary: "#30b389",
      accent: "#EA4335",
      error: "#FF6347",
      success: "#32CD32",
      background: "#FFFFFF",
      background_dark: "#f0f0f0",
      text: "#333333",
    }
  }),
  created() {
    for (let theme in this.theme) {
      document.documentElement.style.setProperty('--'+theme.replace('_', '-'), this.theme[theme])
    }

    this.setRouteTitle(this.$route);

    this.$router.beforeEach((to, from, next) => {
      document.title = to.meta.title || 'Kei';
      next();
    });
  },
  methods: {
    setRouteTitle(route) {
      document.title = route.meta.title || 'Kei';
    },
  }
};
</script>
<style>
  ::-webkit-scrollbar {
    width: 0;
  }
  body, html {
    overflow: hidden;
    margin: 0;
    padding: 0;
    background: transparent;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    width: 100h;
    overflow-y: scroll;
  }
</style>