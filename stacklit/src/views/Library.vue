<template>
  <div id="library">
    <vNavBar/>
    <br><br>
    <div class="filters">
      <span :class="['category', language==category ? 'currentCategory' : '']" v-for="(category, i) in categories" :key="i" @click="setCategory(category)">
        <img v-if="category != 'total'" :src="getIcon(category)">
        <span v-else>
          Total
        </span>
      </span>
    </div>
    <div class="library">
      <div class="starred" v-for="(question, i) in getStarred" :key="i">
        <div class="summary">
          <h2>{{ question.title }}</h2>
          <button :class="['show', isShowing(question.id) ? 'hide' : '']" @click="showQuestion(question.id)">
            <img src="@/assets/icons/chevron-up.svg" height="30px"/>
          </button>
        </div>
        <div :class="['contents', isShowing(question.id) ? 'hideContents' : '']">
          <hr>
          <div v-html="question.answers[0].body">
          </div>
          <div style="display: flex; justify-content: flex-end; padding: 20px; padding-right: 0px;">
            <a :href="questionLink(question.id)" target="_blank">StackOverflow Question Link</a>
          </div>
        </div>
      </div>
    </div>
    <vFooter/>
  </div>
</template>

<script>
import vNavBar from '@/components/vNavBar.vue'
import vFooter from '@/components/vFooter.vue'

export default {
  name: 'vLibrary',
  components: {
    vNavBar,
    vFooter
  },
  data: () => ({
    categories: ["typescript", "ruby", "python", "javascript", "java", "cpp", "csharp", "total"],
    language: "total",
    showing: [],
  }),
  methods: {
    isShowing(questionId) {
      return this.showing.includes(questionId)
    },
    showQuestion(questionId) {
      if (this.isShowing(questionId)) {
        this.showing = this.showing.filter(question => question!=questionId)
      }
      else {
        this.showing.push(questionId)
      }
    },
    setCategory(category) {
      this.language = category.toLowerCase()
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
    questionLink(questionId) {
      const baseUrl = 'https://stackoverflow.com/questions/';
      const questionLink = `${baseUrl}${questionId}`;
      return questionLink
    }
  },
  computed: {
    getStarred() {
      if (this.language == "total") {
        let starred = JSON.parse(localStorage.getItem('stackLitUser')).starred
        
        return starred
      }
      let starred = JSON.parse(localStorage.getItem('stackLitUser')).starred.filter(question => question.tags.includes(this.language))


      return starred
    },
  }
}
</script>

<style scoped>
  #library {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    background: var(--background);
    color: var(--text);
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

  .library {
    padding-top: 50px;
    width: 80%;
    margin-left: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 50px;
    min-height: calc(100vh - 490px);
  }
  .summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .show {
    height: 35px;
    width: 35px;
    border: none;
    margin-right: 20px;
    background: none;
    transform: rotate(90deg);
    transition: transform .3s ease-out;
    transform-origin: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .starred {
    border: 1px solid var(--secondary);
    width: 100%;
    padding: 10px 20px 10px 20px;
    border-radius: 20px;
  }
  .contents {
    height: 0px;
    overflow: hidden;
    transition: height .3s ease-out;
  }
  .show:hover {
    background: var(--background-light);
    cursor: pointer;
  }
  .hide {
    transform: rotate(180deg);
  }
  .hideContents {
    height: fit-content;
    transition: height .3s ease-out;
  }
  .newNote {
    border: none;
    background: none;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .newNote:hover {
    background: var(--background-light);
    cursor: pointer;
  }
  .currentCategory {
    color: var(--secondary);
  }
  .currentCategory img {
    filter: brightness(0) saturate(100%) invert(56%) sepia(60%) saturate(442%) hue-rotate(110deg) brightness(93%) contrast(93%);
  }
</style>
