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
      accent: "#7E57C2",
      error: "#EF5350",
      info: "#2979FF",
      success: "#66BB6A",
      warning: "#FFB300",
      background: "#FFFFFF",
      background_light: "#f0f0f0",
      text: "#333333",
      text_light: "#999",
    },
    dark: false,
  }),
  created() {
    console.log(localStorage.getItem('dark'))
    if (localStorage.getItem('dark')) {
      this.dark = localStorage.getItem('dark') == 'true'
    }

    this.setRouteTitle(this.$route);

    this.$router.beforeEach((to, from, next) => {
      document.title = to.meta.title || 'Kei';
      next();
    });

    if (this.dark) {
      const style = document.createElement('style');

      const css = 'img:not(.noinvert) { filter: invert(100%); }';

      style.appendChild(document.createTextNode(css));

      document.head.appendChild(style);

      this.theme = {
        primary: "#30b389",
        secondary: "#30b389",
        accent: "#7E57C2",
        error: "#EF5350",
        info: "#2979FF",
        success: "#66BB6A",
        warning: "#FFB300",
        background: "#333333",
        background_light: "#2c2c2c",
        text: "#FFFFFF",
        text_light: "#CCCCCC",
      }
    }
    
    for (let theme in this.theme) {
      document.documentElement.style.setProperty('--'+theme.replace('_', '-'), this.theme[theme])
    }
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

  pre {
    white-space: pre-wrap !important;
    width: 100%;
  }
</style>