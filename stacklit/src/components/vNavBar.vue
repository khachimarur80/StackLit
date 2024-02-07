<template>
  <div id="navBar">
    <a class="navbar-title" href="/">
      <img src="@/assets/logo.png" height="40px" class="noinvert"/>
      StackLit
    </a>
    <div class="spacer">
    </div>
    <div class="navbar-items">
      <a class="navbar-item" v-if="authenticated && site != 'dashboard'" href="/dashboard">
        Dashboard
      </a>
      <a class="navbar-item" v-if="authenticated && site != 'library'" href="/library">
        Library
      </a>
      <a class="navbar-item" v-if="authenticated && site != 'leaderboard'" href="/leaderboard">
        Leaderboard
      </a>
      <a class="navbar-item" v-if="authenticated && site != 'profile'" href="/profile">
        Profile
      </a>
      <a class="navbar-item" v-if="authenticated" @click="logout">
        Logout
      </a>
      <a class="navbar-item" v-if="!authenticated" href="/login">
        Login
      </a>
      <a class="navbar-item" v-if="!authenticated" href="/signup">
        Sign Up
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vNavBar',
  data: () => ({
    authenticated: false,
    site: '',
  }),
  mounted() {
    this.authenticated = localStorage.getItem('authenticated')=='true'

    this.site = window.location.href.split('/').at(-1)
  },
  methods: {
    logout() {
      localStorage.setItem('authenticated', 'false')
      window.location.href = window.location.protocol + '//' + window.location.host
    }
  },
}
</script>

<style scoped>
  #navBar {
    height: 60px;
    width: 100h;
    display: flex;
    align-items: center;
    padding: 10px;
    background: linear-gradient(to bottom, var(--background) 75%, rgb(255, 255, 255, 0) 100%);
  }
  .navbar-title {
    color: var(--text);
    margin-left: 20px;
    margin-right: 20px;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .spacer {
    flex: 1;
  }
  .navbar-items {
    padding: 0px 10px 0px 10px;
    gap: 20px;
    display: flex;
  }

  .navbar-item {
    color: var(--text) !important;
    user-select: none;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    transition: background .15s ease-in-out;
    border: 2px solid transparent;
  }

  .navbar-item:hover {
    background: var(--background-light);
  }
  .navbar-item:active {
    border-color: var(--primary);
  }

</style>
