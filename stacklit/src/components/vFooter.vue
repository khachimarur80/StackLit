<template>
  <footer id="footer">
    <span class="footer-title">
      StackLit
    </span>
    <span class="socials">
      <a
        v-for="(social, i) in socials"
        :key="i"
        :href="social.link"
        target="_blank"
        class="social-link"
      >
        <button>
         <img :src="social.icon" :alt="social.name" height="100%">
        </button>
      </a>
    </span>
    <span class="footer-text">
      ©2024 StackLit - Web created by Hachimaru Kei
    </span>
    <span class="footer-text">
      <a href="https://lordicon.com/" style="text-decoration: none; color: var(--text)">Icons by Lordicon.com</a>
    </span>
  </footer>
</template>

<script>
export default {
  name: 'vFooter',
  data: ()=>({
    socials: [
      {
        name: 'Facebook',
        icon: require('@/assets/icons/facebook.svg'),
        link: '#',
      },
      {
        name: 'Instagram',
        icon: require('@/assets/icons/instagram.svg'),
        link: '#',
      },
      {
        name: 'Twitter',
        icon: require('@/assets/icons/twitter.svg'),
        link: '#',
      },
    ]
  }),
}
</script>

<style scoped>
  #footer {
    user-select: none;
    height: 140px;
    padding: 20px;
    display: flex;
    background: var(--primary);
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
  }
  .footer-title {
    font-weight: bold;
    font-size: 24px;
    color: var(--background-dark);
  }
  .footer-text {
    font-size: 14px;
    color: var(--background-dark);
  }
  .socials {
    display: flex;
    gap: 20px;
    margin: 10px;
  }
  .socials span {
    background: white;
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }
  button {
    height: 30px;
    width: 30px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border-radius: 50%;
  }
  button:hover {
    background: var(--background);
    cursor: pointer;
  }
  button:active {
    border: 1px solid var(--background-dark);
  }
</style>
