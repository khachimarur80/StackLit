<template>
  <div id="hero">
    <div class="text">
      <span class="title">
        Test your programming skills everywhere. Become the best debugger.
      </span>
      <span class="explanation">
        Use the proven to be efficient flashcard method to study real coding cases, sharpening your coding skills.
      </span>
      <div class="signup-container" v-if="!authenticated">
        <a class="signup-btn" href="/signup">
          Signup for free
        </a>
      </div>
    </div>
    <img :src="heroImage" id="hero-image"/>
  </div>
</template>

<script>
export default {
  name: 'vNavBar',
  data: () => ({
    heroImage: require('@/assets/illustrations/ilustracion-concepto-creador-sitio-web/4300580.jpg'),
    authenticated: false,
  }),
  mounted() {
    this.authenticated = localStorage.getItem('authenticated')
  }
}
</script>

<style scoped>
  #hero {
    min-height: calc(100vh - 80px);
    max-height: 400px;
    width: 100h;
    display: flex;
    justify-content: space-around;
    overflow: hidden;
  }
  #hero-image {
    height: 100%;
    max-width: 50%;
  }
  .text {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-left: 30px;
    padding-top: 50px;
  }
  .title {
    font-size: 30px;
    font-weight: bold;
    color: var(--text);
    max-width: 600px;
  }
  .explanation {
    font-size: 18px;
    opacity: .75;
    margin-top: 25px;
    line-height: 20px;
    max-width: 600px;
  }
  .signup-btn {
    border: 2px solid var(--primary);
    padding: 10px 12px 10px 12px;
    border-radius: 8px;
    background: transparent;
    color: var(--text);
    font-size: 18px;
    transition: background .15s ease-in-out;
    cursor: pointer;
    text-decoration: none;
  }
  .signup-btn:hover {
    background: var(--primary);
  }
  .signup-btn:active {
    filter: brightness(.95);
  }
  .signup-container {
    width: 100%;
    padding-top: 45px;
  }
</style>
