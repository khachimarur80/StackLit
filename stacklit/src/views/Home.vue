<template>
  <div id="home">
    <div class="blob" v-for="(blob, index) in blobs" :key="index" :style="blob.style"></div>
    <vNavBar/>
    <vHero/>
    <br><br>
    <h2 style="text-align: center;">Join <span style="color: var(--secondary)">100,000+</span>programmers leveling up their skills!</h2>
    <br><br><br>
    <div class="section" id="challenge">
      <div class="explanation">
        <h1>Challenge yourself</h1>
        <p>Seek the most challenging questions and improve your coding abilities. Try getting the lowest times possibles. How long can you keep your streak?</p>
      </div>
      <div class="image">
        <img src="@/assets/images/longstreak.png" width="100%" class="noinvert"/>
      </div>
    </div>
    <div class="section" id="learn">
      <div class="explanation">
        <h1>Learn from the best</h1>
        <p>Click reveal, to see the most voted StackOverflow answer, so you can check how accurate your response was. Here is were you learn the most!</p>
      </div>
      <div class="image">
        <img src="@/assets/images/bestanswer.png" width="100%" class="noinvert"/>
      </div>
    </div>
    <div class="section" id="keep">
      <div class="explanation">
        <h1>Keep your favourites</h1>
        <p>Star the most interesting questions so you can then revise them later. Revise the answers and keep your knowledge refreshed. You will be able to filter them by language too!</p>
      </div>
      <div class="image">
        <img src="@/assets/images/seefavourites.png" width="100%" class="noinvert"/>
      </div>
    </div>
    <div class="section" id="position">
      <div class="explanation">
        <h1>Position yourself</h1>
        <p>You can see were you stand at at the leaderboards! You will be able to see how others users do in different languages, or in all languaes in general. Can you reach top 10% ?</p>
      </div>
      <div class="image">
        <img src="@/assets/images/leaderboards.png" width="100%" class="noinvert"/>
      </div>
    </div>

    <h1 style="text-align: center;">Ready to <span style="color: var(--secondary)">try StackLit?</span></h1>
    <button class="join" @click="signup">Join 100,000+ programmers</button>
    <br><br><br><br>
    <vFooter/>
  </div>
</template>

<script>
import vNavBar from '@/components/vNavBar.vue'
import vHero from '@/components/vHero.vue'
import vFooter from '@/components/vFooter.vue'

export default {
  name: 'vHome',
  components: {
    vNavBar,
    vHero,
    vFooter
  },
  data: () => ({
    blobs: [],
    windowWidth: 0,
    windowHeight: 0,
  }),
  mounted() {
    this.windowHeight =  Math.floor(document.getElementById("footer").getBoundingClientRect().top)
    this.generateBlobs();
    window.addEventListener("resize", this.handleWindowResize);
  },
  methods: {
    signup() {
      window.location.href = window.location.protocol + "//" + window.location.host + '/signup'
    },
    generateBlobs() {
      const minDistance = 650;
      for (let i = 0; i < Math.floor(this.windowHeight/minDistance); i++) {
        console.log(i)
        let randomTop = i*minDistance + Math.random()*(minDistance/2)
        let randomLeft = Math.random()*(minDistance)
        this.blobs.push({
          style: {
            top: `${randomTop}px`,
            left: `${randomLeft}px`
          }
        });
      }
    },
    handleWindowResize() {
      this.windowHeight = Math.floor(document.getElementById("footer").getBoundingClientRect().top)
      this.blobs = [];
      this.generateBlobs();
    }
  }
}
</script>

<style scoped>
  .blob {
    position: absolute;
    height: 100px;
    width: 300px;
    border-radius: 50%;
    background: var(--primary);
    top: 200px;
    left: -150px;
    z-index: -1;
    filter: blur(100px) opacity(.8);
  }
  #home {
    height: 100vh;
    width: 100%;
    overflow-y: scroll;
    position: relative;
    overflow-x: hidden;
    background: var(--background);
    color: var(--text);
  }
  .section {
    width: calc(80% - 40px);
    margin-left: 10%;
    display: flex;
    margin-bottom: 100px;
    padding: 20px;
    border-radius: 30px;
  }
  .explanation {
    width: 40%;
    height: 100%;
    padding: 20px;
  }
  .explanation p {
    margin-left: 15px;
    color: var(--text-light);
    font-size: 20px;
    margin-right: 20px;
  }
  .image {
    border-radius: 20px;
    box-shadow: 1px 2px 4px 1px #333;
    overflow: hidden;
    width: 60%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #challenge {
    background: linear-gradient(to bottom right, var(--background) 0%, rgba(219, 68, 55, 0.8) 100%);
  }
  #learn {
    background: linear-gradient(to bottom left, var(--background) 0%, rgba(244, 180, 0, 0.8) 100%);
    flex-direction: row-reverse;
  }
  #keep {
    background: linear-gradient(to bottom right, var(--background) 0%, rgba(15, 157, 88, 0.8) 100%);
  }
  #position {
    background: linear-gradient(to bottom left, var(--background) 0%, rgba(66, 133, 244, 0.8) 100%);
    flex-direction: row-reverse;
  }

  .join {
    width: 60%;
    margin-left: 20%;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 10px;
    font-size: 22px;
    background: var(--secondary);
    border: 1px solid var(--primary);
    color: white;
    border-radius: 10px;
    text-decoration: none;
  }
  .join:hover {
    filter: brightness(1.1);
    cursor: pointer;
  }
</style>
