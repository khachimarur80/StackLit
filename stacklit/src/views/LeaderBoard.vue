<template>
  <div id="leaderboard">
    <vNavBar/>
    <div class="position">
      <h3>You are in {{ position + 1 }}{{ positionSuffix(position) }} position!</h3>
      <p class="percentile">You are above the {{ percentile }}% of users</p>
    </div>
    <div class="filters">
      <span :class="['category', currentCategory==category.toLowerCase() ? 'currentCategory' : '']" v-for="(category, i) in categories" :key="i" @click="setCategory(category)">
        <img v-if="category != 'Total'" :src="getIcon(category)">
        <span v-else>
          Total
        </span>
      </span>
    </div>
    <div class="leaderboard">
      <div class="user-header">
        <span class="index">
        </span>
        <span class="username">
          Username
        </span>
        <span class="solved">
          Solved
        </span>
        <span class="attempts">
          Attempts
        </span>
        <span class="joined">
          Joined
        </span>
      </div>
      <div :class="['user', localUser==user ? 'actual' : '']" v-for="(user, i) in loadedUsers" :key="i">
        <span class="index">
          {{ i }}
        </span>
        <span class="username">
          {{ user.username }}
        </span>
        <span class="solved">
          {{ getSolved(user) }}
        </span>
        <span class="attempts">
          {{ getAttempts(user) }}
        </span>
        <span class="joined">
          {{ user.joined }}
        </span>
      </div>
      <div class="loading" v-if="loading">
        <div class="loader">
        </div>
      </div>
      <button @click="loadUsers" v-if="loadedNum < users.length">
        Load more ...
      </button>
    </div>
    <vFooter/>
  </div>
</template>

<script>
import vNavBar from '@/components/vNavBar.vue'
import vFooter from '@/components/vFooter.vue'

export default {
  name: 'LeaderBoard',
  components: {
    vNavBar,
    vFooter
  },
  data: () => ({
    currentCategory: "total",
    categories: [],
    position: 34,
    users: [
      { username: 'awesome_coder2', joined: '02/10/24', performance: [{ tag: 'JavaScript', solved: 21, attempts: 45 }, { tag: 'Python', solved: 11, attempts: 22 }, { tag: 'Java', solved: 9, attempts: 12 }, { tag: 'C++', solved: 1, attempts: 3 }, { tag: 'Ruby', solved: 2, attempts: 5 }, { tag: 'Total', solved: 44, attempts: 87 }] },
      { username: 'pro_gamer3', joined: '02/11/24', performance: [{ tag: 'JavaScript', solved: 3, attempts: 8 }, { tag: 'Python', solved: 1, attempts: 4 }, { tag: 'Java', solved: 1, attempts: 7 }, { tag: 'PHP', solved: 2, attempts: 6 }, { tag: 'Swift', solved: 1, attempts: 4 }, { tag: 'Total', solved: 8, attempts: 29 }] },
      { username: 'coding_ninja4', joined: '02/12/24', performance: [{ tag: 'JavaScript', solved: 38, attempts: 70 }, { tag: 'Python', solved: 20, attempts: 35 }, { tag: 'Java', solved: 10, attempts: 15 }, { tag: 'C#', solved: 5, attempts: 10 }, { tag: 'TypeScript', solved: 15, attempts: 30 }, { tag: 'Total', solved: 88, attempts: 160 }] },
      { username: 'puzzle_master5', joined: '02/13/24', performance: [{ tag: 'JavaScript', solved: 18, attempts: 35 }, { tag: 'Python', solved: 8, attempts: 15 }, { tag: 'Java', solved: 5, attempts: 20 }, { tag: 'Ruby', solved: 1, attempts: 5 }, { tag: 'PHP', solved: 2, attempts: 5 }, { tag: 'Total', solved: 34, attempts: 80 }] },
      { username: 'algorithm_geek6', joined: '02/14/24', performance: [{ tag: 'JavaScript', solved: 32, attempts: 60 }, { tag: 'Python', solved: 10, attempts: 22 }, { tag: 'Java', solved: 5, attempts: 28 }, { tag: 'C++', solved: 3, attempts: 5 }, { tag: 'Ruby', solved: 2, attempts: 10 }, { tag: 'Total', solved: 47, attempts: 125 }] },
      { username: 'math_wiz7', joined: '02/15/24', performance: [{ tag: 'JavaScript', solved: 9, attempts: 15 }, { tag: 'Python', solved: 4, attempts: 10 }, { tag: 'Java', solved: 3, attempts: 5 }, { tag: 'C#', solved: 2, attempts: 5 }, { tag: 'Swift', solved: 1, attempts: 5 }, { tag: 'Total', solved: 19, attempts: 40 }] },
      { username: 'code_enthusiast8', joined: '02/16/24', performance: [{ tag: 'JavaScript', solved: 46, attempts: 85 }, { tag: 'Python', solved: 20, attempts: 32 }, { tag: 'Java', solved: 15, attempts: 25 }, { tag: 'C++', solved: 4, attempts: 10 }, { tag: 'Ruby', solved: 3, attempts: 15 }, { tag: 'Total', solved: 88, attempts: 167 }] },
      { username: 'java_dev9', joined: '02/17/24', performance: [{ tag: 'JavaScript', solved: 10, attempts: 20 }, { tag: 'Python', solved: 5, attempts: 12 }, { tag: 'Java', solved: 5, attempts: 26 }, { tag: 'C#', solved: 2, attempts: 8 }, { tag: 'TypeScript', solved: 1, attempts: 12 }, { tag: 'Total', solved: 23, attempts: 78 }] },
      { username: 'pythonista10', joined: '02/18/24', performance: [{ tag: 'JavaScript', solved: 18, attempts: 40 }, { tag: 'Python', solved: 10, attempts: 20 }, { tag: 'Java', solved: 10, attempts: 20 }, { tag: 'C++', solved: 2, attempts: 8 }, { tag: 'Ruby', solved: 2, attempts: 2 }, { tag: 'Total', solved: 42, attempts: 90 }] },
      { username: 'web_dev_pro11', joined: '02/19/24', performance: [{ tag: 'JavaScript', solved: 5, attempts: 10 }, { tag: 'Python', solved: 2, attempts: 5 }, { tag: 'Java', solved: 2, attempts: 8 }, { tag: 'C#', solved: 1, attempts: 2 }, { tag: 'Swift', solved: 1, attempts: 5 }, { tag: 'Total', solved: 11, attempts: 30 }] },
      { username: 'cyber_security12', joined: '02/20/24', performance: [{ tag: 'JavaScript', solved: 34, attempts: 60 }, { tag: 'Python', solved: 15, attempts: 25 }, { tag: 'Java', solved: 20, attempts: 40 }, { tag: 'C#', solved: 5, attempts: 15 }, { tag: 'TypeScript', solved: 3, attempts: 9 }, { tag: 'Total', solved: 77, attempts: 149 }] },
      { username: 'data_scientist13', joined: '02/21/24', performance: [{ tag: 'JavaScript', solved: 25, attempts: 45 }, { tag: 'Python', solved: 15, attempts: 25 }, { tag: 'Java', solved: 10, attempts: 20 }, { tag: 'C++', solved: 8, attempts: 20 }, { tag: 'Ruby', solved: 2, attempts: 5 }, { tag: 'Total', solved: 50, attempts: 95 }] },
      { username: 'coding_diva14', joined: '02/22/24', performance: [{ tag: 'JavaScript', solved: 5, attempts: 10 }, { tag: 'Python', solved: 3, attempts: 8 }, { tag: 'Java', solved: 3, attempts: 8 }, { tag: 'C#', solved: 0, attempts: 0 }, { tag: 'Swift', solved: 0, attempts: 0 }, { tag: 'Total', solved: 11, attempts: 26 }] },
      { username: 'code_master15', joined: '02/23/24', performance: [{ tag: 'JavaScript', solved: 15, attempts: 30 }, { tag: 'Python', solved: 10, attempts: 15 }, { tag: 'Java', solved: 7, attempts: 15 }, { tag: 'C++', solved: 2, attempts: 5 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 32, attempts: 65 }] },
      { username: 'programming_guru16', joined: '02/24/24', performance: [{ tag: 'JavaScript', solved: 8, attempts: 20 }, { tag: 'Python', solved: 6, attempts: 12 }, { tag: 'Java', solved: 4, attempts: 10 }, { tag: 'C#', solved: 0, attempts: 0 }, { tag: 'Swift', solved: 0, attempts: 0 }, { tag: 'Total', solved: 18, attempts: 42 }] },
      { username: 'tech_whiz17', joined: '02/25/24', performance: [{ tag: 'JavaScript', solved: 27, attempts: 55 }, { tag: 'Python', solved: 18, attempts: 40 }, { tag: 'Java', solved: 10, attempts: 20 }, { tag: 'C++', solved: 0, attempts: 0 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 55, attempts: 115 }] },
      { username: 'coding_addict18', joined: '02/26/24', performance: [{ tag: 'JavaScript', solved: 10, attempts: 20 }, { tag: 'Python', solved: 8, attempts: 15 }, { tag: 'Java', solved: 5, attempts: 10 }, { tag: 'C#', solved: 2, attempts: 5 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 25, attempts: 50 }] },
      { username: 'code_junkie19', joined: '02/27/24', performance: [{ tag: 'JavaScript', solved: 15, attempts: 30 }, { tag: 'Python', solved: 10, attempts: 25 }, { tag: 'Java', solved: 8, attempts: 20 }, { tag: 'C++', solved: 3, attempts: 5 }, { tag: 'Ruby', solved: 4, attempts: 10 }, { tag: 'Total', solved: 40, attempts: 90 }] },
      { username: 'code_wizard20', joined: '02/28/24', performance: [{ tag: 'JavaScript', solved: 2, attempts: 5 }, { tag: 'Python', solved: 3, attempts: 7 }, { tag: 'Java', solved: 2, attempts: 3 }, { tag: 'C#', solved: 0, attempts: 0 }, { tag: 'Swift', solved: 0, attempts: 0 }, { tag: 'Total', solved: 7, attempts: 15 }] },
      { username: 'programming_ninja21', joined: '02/29/24', performance: [{ tag: 'JavaScript', solved: 12, attempts: 25 }, { tag: 'Python', solved: 8, attempts: 15 }, { tag: 'Java', solved: 5, attempts: 10 }, { tag: 'C++', solved: 3, attempts: 5 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 28, attempts: 50 }] },
      { username: 'code_expert22', joined: '03/01/24', performance: [{ tag: 'JavaScript', solved: 31, attempts: 60 }, { tag: 'Python', solved: 15, attempts: 25 }, { tag: 'Java', solved: 10, attempts: 22 }, { tag: 'C#', solved: 5, attempts: 10 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 61, attempts: 117 }] },
      { username: 'coding_savvy23', joined: '03/02/24', performance: [{ tag: 'JavaScript', solved: 6, attempts: 15 }, { tag: 'Python', solved: 5, attempts: 10 }, { tag: 'Java', solved: 2, attempts: 5 }, { tag: 'C++', solved: 0, attempts: 0 }, { tag: 'Swift', solved: 0, attempts: 0 }, { tag: 'Total', solved: 13, attempts: 30 }] },
      { username: 'algorithm_expert24', joined: '03/03/24', performance: [{ tag: 'JavaScript', solved: 10, attempts: 20 }, { tag: 'Python', solved: 15, attempts: 25 }, { tag: 'Java', solved: 8, attempts: 15 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'PHP', solved: 0, attempts: 0 }, { tag: 'Total', solved: 33, attempts: 75 }] },
      { username: 'dev_genius25', joined: '03/04/24', performance: [{ tag: 'JavaScript', solved: 21, attempts: 40 }, { tag: 'Python', solved: 15, attempts: 25 }, { tag: 'Java', solved: 10, attempts: 20 }, { tag: 'C#', solved: 0, attempts: 0 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 46, attempts: 85 }] },
      { username: 'python_coder26', joined: '03/05/24', performance: [{ tag: 'JavaScript', solved: 12, attempts: 25 }, { tag: 'Python', solved: 8, attempts: 15 }, { tag: 'Java', solved: 6, attempts: 12 }, { tag: 'C++', solved: 0, attempts: 0 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 26, attempts: 52 }] },
      { username: 'java_guru27', joined: '03/06/24', performance: [{ tag: 'JavaScript', solved: 28, attempts: 50 }, { tag: 'Python', solved: 20, attempts: 35 }, { tag: 'Java', solved: 15, attempts: 35 }, { tag: 'C#', solved: 4, attempts: 10 }, { tag: 'TypeScript', solved: 4, attempts: 10 }, { tag: 'Total', solved: 71, attempts: 130 }] },
      { username: 'web_dev_prodigy28', joined: '03/07/24', performance: [{ tag: 'JavaScript', solved: 6, attempts: 10 }, { tag: 'Python', solved: 4, attempts: 8 }, { tag: 'Java', solved: 0, attempts: 0 }, { tag: 'C++', solved: 0, attempts: 0 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 10, attempts: 18 }] },
      { username: 'coding_pro29', joined: '03/08/24', performance: [{ tag: 'JavaScript', solved: 22, attempts: 45 }, { tag: 'Python', solved: 15, attempts: 25 }, { tag: 'Java', solved: 10, attempts: 20 }, { tag: 'C#', solved: 2, attempts: 5 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 49, attempts: 95 }] },
      { username: 'code_goddess30', joined: '03/09/24', performance: [{ tag: 'JavaScript', solved: 10, attempts: 22 }, { tag: 'Python', solved: 5, attempts: 15 }, { tag: 'Java', solved: 0, attempts: 0 }, { tag: 'C++', solved: 0, attempts: 0 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 15, attempts: 37 }] },
      { username: 'programming_ace31', joined: '03/10/24', performance: [{ tag: 'JavaScript', solved: 18, attempts: 35 }, { tag: 'Python', solved: 10, attempts: 20 }, { tag: 'Java', solved: 6, attempts: 10 }, { tag: 'C#', solved: 3, attempts: 5 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 37, attempts: 70 }] },
      { username: 'code_nerd32', joined: '03/11/24', performance: [{ tag: 'JavaScript', solved: 30, attempts: 55 }, { tag: 'Python', solved: 20, attempts: 35 }, { tag: 'Java', solved: 10, attempts: 20 }, { tag: 'C#', solved: 5, attempts: 10 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 63, attempts: 120 }] },
      { username: 'tech_wunderkind33', joined: '03/12/24', performance: [{ tag: 'JavaScript', solved: 14, attempts: 30 }, { tag: 'Python', solved: 8, attempts: 15 }, { tag: 'Java', solved: 6, attempts: 10 }, { tag: 'C++', solved: 2, attempts: 5 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 22, attempts: 60 }] },
      { username: 'coding_phenom34', joined: '03/13/24', performance: [{ tag: 'JavaScript', solved: 28, attempts: 50 }, { tag: 'Python', solved: 15, attempts: 25 }, { tag: 'Java', solved: 10, attempts: 15 }, { tag: 'C#', solved: 1, attempts: 5 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 54, attempts: 95 }] },
      { username: 'python_prodigy35', joined: '03/14/24', performance: [{ tag: 'JavaScript', solved: 6, attempts: 12 }, { tag: 'Python', solved: 2, attempts: 6 }, { tag: 'Java', solved: 0, attempts: 0 }, { tag: 'C#', solved: 0, attempts: 0 }, { tag: 'Swift', solved: 0, attempts: 0 }, { tag: 'Total', solved: 8, attempts: 18 }] },
      { username: 'java_phenomenon36', joined: '03/15/24', performance: [{ tag: 'JavaScript', solved: 15, attempts: 30 }, { tag: 'Python', solved: 8, attempts: 15 }, { tag: 'Java', solved: 6, attempts: 15 }, { tag: 'C++', solved: 0, attempts: 0 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 29, attempts: 60 }] },
      { username: 'web_dev_virtuoso37', joined: '03/16/24', performance: [{ tag: 'JavaScript', solved: 16, attempts: 35 }, { tag: 'Python', solved: 15, attempts: 25 }, { tag: 'Java', solved: 7, attempts: 15 }, { tag: 'C#', solved: 5, attempts: 10 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 43, attempts: 85 }] },
      { username: 'code_virtuoso38', joined: '03/17/24', performance: [{ tag: 'JavaScript', solved: 8, attempts: 18 }, { tag: 'Python', solved: 8, attempts: 15 }, { tag: 'Java', solved: 2, attempts: 5 }, { tag: 'C++', solved: 1, attempts: 5 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 19, attempts: 43 }] },
      { username: 'programming_scholar39', joined: '03/18/24', performance: [{ tag: 'JavaScript', solved: 20, attempts: 40 }, { tag: 'Python', solved: 15, attempts: 25 }, { tag: 'Java', solved: 10, attempts: 20 }, { tag: 'C#', solved: 9, attempts: 15 }, { tag: 'TypeScript', solved: 5, attempts: 10 }, { tag: 'Total', solved: 59, attempts: 110 }] },
      { username: 'coding_scholar40', joined: '03/19/24', performance: [{ tag: 'JavaScript', solved: 5, attempts: 10 }, { tag: 'Python', solved: 3, attempts: 8 }, { tag: 'Java', solved: 3, attempts: 8 }, { tag: 'C++', solved: 1, attempts: 4 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 12, attempts: 30 }] },
      { username: 'code_sage41', joined: '03/20/24', performance: [{ tag: 'JavaScript', solved: 10, attempts: 20 }, { tag: 'Python', solved: 10, attempts: 22 }, { tag: 'Java', solved: 5, attempts: 10 }, { tag: 'C++', solved: 5, attempts: 15 }, { tag: 'Ruby', solved: 2, attempts: 5 }, { tag: 'Total', solved: 32, attempts: 72 }] },
      { username: 'programming_legend42', joined: '03/21/24', performance: [{ tag: 'JavaScript', solved: 18, attempts: 35 }, { tag: 'Python', solved: 10, attempts: 20 }, { tag: 'Java', solved: 4, attempts: 10 }, { tag: 'C#', solved: 0, attempts: 0 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 32, attempts: 65 }] },
      { username: 'code_legend43', joined: '03/22/24', performance: [{ tag: 'JavaScript', solved: 40, attempts: 80 }, { tag: 'Python', solved: 15, attempts: 25 }, { tag: 'Java', solved: 15, attempts: 20 }, { tag: 'C#', solved: 0, attempts: 0 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 70, attempts: 125 }] },
      { username: 'tech_legend44', joined: '03/23/24', performance: [{ tag: 'JavaScript', solved: 8, attempts: 15 }, { tag: 'Python', solved: 5, attempts: 10 }, { tag: 'Java', solved: 3, attempts: 8 }, { tag: 'C++', solved: 1, attempts: 7 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 17, attempts: 40 }] },
      { username: 'coding_hero45', joined: '03/24/24', performance: [{ tag: 'JavaScript', solved: 21, attempts: 40 }, { tag: 'Python', solved: 10, attempts: 20 }, { tag: 'Java', solved: 10, attempts: 18 }, { tag: 'C#', solved: 0, attempts: 0 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 41, attempts: 78 }] },
      { username: 'programming_hero46', joined: '03/25/24', performance: [{ tag: 'JavaScript', solved: 14, attempts: 30 }, { tag: 'Python', solved: 10, attempts: 20 }, { tag: 'Java', solved: 3, attempts: 5 }, { tag: 'C++', solved: 0, attempts: 0 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 27, attempts: 55 }] },
      { username: 'code_hero47', joined: '03/26/24', performance: [{ tag: 'JavaScript', solved: 25, attempts: 50 }, { tag: 'Python', solved: 15, attempts: 25 }, { tag: 'Java', solved: 10, attempts: 20 }, { tag: 'C#', solved: 2, attempts: 5 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 52, attempts: 100 }] },
      { username: 'web_dev_hero48', joined: '03/27/24', performance: [{ tag: 'JavaScript', solved: 10, attempts: 20 }, { tag: 'Python', solved: 5, attempts: 10 }, { tag: 'Java', solved: 1, attempts: 5 }, { tag: 'C++', solved: 0, attempts: 0 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 16, attempts: 35 }] },
      { username: 'coding_heroine49', joined: '03/28/24', performance: [{ tag: 'JavaScript', solved: 18, attempts: 35 }, { tag: 'Python', solved: 10, attempts: 20 }, { tag: 'Java', solved: 8, attempts: 10 }, { tag: 'C#', solved: 0, attempts: 0 }, { tag: 'TypeScript', solved: 0, attempts: 0 }, { tag: 'Total', solved: 36, attempts: 65 }] },
      { username: 'code_heroine50', joined: '03/29/24', performance: [{ tag: 'JavaScript', solved: 6, attempts: 15 }, { tag: 'Python', solved: 5, attempts: 10 }, { tag: 'Java', solved: 2, attempts: 3 }, { tag: 'C++', solved: 1, attempts: 5 }, { tag: 'Ruby', solved: 0, attempts: 0 }, { tag: 'Total', solved: 14, attempts: 33 }] },
    ],
    loadedNum: 5,
    loading: true,
    loadedUsers: [],
    localUser: [],
    percentile: 0,
  }),
  methods: {
    positionSuffix(position) {
      const suffixes = ["th", "st", "nd", "rd"];
      const lastDigit = (position + 1) % 10;
      const suffixIndex = lastDigit === 1 && position !== 11 ? 1 :
                         lastDigit === 2 && position !== 12 ? 2 :
                         lastDigit === 3 && position !== 13 ? 3 : 0;
      return suffixes[suffixIndex];
    },
    setCategory(category) {
      this.currentCategory = category.toLowerCase()
      this.users = this.users.sort((a, b) => this.getSolved(b) - this.getSolved(a))
      this.loadedUsers = [... this.users.slice(0, Math.min(this.loadedNum, this.users.length))]
      this.calculatePosition()
    },
    getIcon(language) {
      if (language == 'C++') {
        return require('@/assets/languages/language-cpp.svg')
      }
      else if (language == 'C#') {
        return require('@/assets/languages/language-csharp.svg')
      }
      else {
        return require(`@/assets/languages/language-${language.toLowerCase()}.svg`)
      }
    },
    loadUsers() {
      this.loading = true
      setTimeout(()=>{
        this.loadedNum += 10
        this.loadedUsers = [... this.users.slice(0, Math.min(this.loadedNum, this.users.length))]
        this.categories = Array.from(new Set(this.loadedUsers.map(user => user.performance).flat().map(category => category.tag))).sort()
        this.loading = false
      }, Math.floor(Math.random() * (1000 - 250 + 1) + 250))
    },
    getSolved(user) {
      let solved = user.performance.filter( performance => performance.tag.toLowerCase() == this.currentCategory)
      if (solved.length) {
        return solved[0].solved
      }
      return 0
    },
    getAttempts(user) {
      let attempts = user.performance.filter( performance => performance.tag.toLowerCase() == this.currentCategory)
      if (attempts.length) {
        return attempts[0].attempts
      }
      return 0
    },
    calculatePosition() {
      this.position = this.users.indexOf(this.localUser)
      this.percentile = 100 - parseInt(this.position/(this.users.length-1)*100)
    }
  },
  mounted() {
    this.localUser = JSON.parse(localStorage.getItem('stackLitUser'))
    this.users.push(this.localUser)

    this.users = this.users.sort((a, b) => this.getSolved(b) - this.getSolved(a))
    this.calculatePosition()

    setTimeout(()=>{
      this.loadedUsers = this.users.slice(0,this.loadedNum)
      this.categories = Array.from(new Set(this.loadedUsers.map(user => user.performance).flat().map(category => category.tag))).sort()
      this.loading = false
    }, 1000)
  }
}
</script>

<style scoped>
  #leaderboard {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    background: var(--background);
    color: var(--text);
  }
  .position {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 30px;
    color: var(--text);
    margin: 30px;
  }
  .leaderboard {
    width: 90%;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    padding-bottom: 30px;
    margin-bottom: 100px;
  }
  .leaderboard-header {
    font-size: 24px;
    margin-bottom: 60px;
  }
  .user, .user-header {
    width: 90%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .user {
    border-radius: 10px;
  }
  .user:nth-child(2n) {
    background: var(--background-light);
  }
  .user-header > * {
    color: var(--secondary);
  }
  .username {
    width: 30%;
    height: 100%;
  }
  .index {
    width: 60px;
    height: 100%;
    color: var(--secondary);
  }
  .attempts {
    text-align: center;
    width: 100px;
  }
  .solved {
    text-align: center;
    width: 100px;
  }
  .joined {
    width: 80px;
  }
  .loading {
    margin: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 3px solid var(--primary);
    border-radius: 50%;
    border-top-color: var(--background);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }

  button {
    margin-top: 30px;
    border: 1px solid var(--primary);
    padding: 10px 12px 10px 12px;
    border-radius: 8px;
    background: transparent;
    color: var(--text);
    font-size: 16px;
    transition: background .15s ease-in-out;
    cursor: pointer;
    text-decoration: none;
    width: 200px;
    text-align: center;
    user-select: none;
  }
  button:hover {
    background: var(--primary);
  }
  button:active {
    filter: brightness(.95);
  }

  .actual {
    border: 1px solid var(--primary);
  }

  .percentile {
    font-size: 16px;
    color: var(--text-light);
    margin-top: -20px;
  }

  .filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    margin-bottom: 30px;
  }
  .category {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: var(--background-light);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 2px solid var(--background);
    cursor: pointer;
    transition: border .15s ease-out;
  }
  .category img {
    transition: filter .15s ease-out;
  }

  .currentCategory {
    border: 2px solid var(--secondary);
  }
  .currentCategory img {
    filter: brightness(0) saturate(100%) invert(56%) sepia(60%) saturate(442%) hue-rotate(110deg) brightness(93%) contrast(93%);
  }
</style>
