<template>
  <div id="dashboard">
    <vNavBar/>
    <div id="study">
      <div class="infobar">
        <div class="infobar-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path :fill="streakColor" d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" /></svg>
          <span>Streak: {{ streak }}</span>
        </div>
        <div class="infobar-item">
          <img src="@/assets/icons/check-circle-outline.svg" height="30px"/>
          <span>Solved: {{ totalSolved }}</span>
        </div>
        <div class="infobar-item">
          <img src="@/assets/icons/bullseye.svg" height="30px"/>
          <span>Attempted: {{ totalQuestions }}</span>
        </div>
        <div class="infobar-item">
          <img src="@/assets/icons/clock-outline.svg" height="30px"/>
          <span>Time: {{ totalTime }}</span>
        </div>
      </div>
      <div class="filters">
        <span :class="['category', language==category ? 'currentCategory' : '']" v-for="(category, i) in categories" :key="i" @click="setCategory(category)">
          <img v-if="category != 'Total'" :src="getIcon(category)">
          <span v-else>
            Total
          </span>
        </span>
      </div>
      <div class="flashcard" v-if="question.id">
        <div class="face" v-if="!revealed && !grading">
          <span class="timer">
            <img src="@/assets/icons/clock.gif" height="30px"/>
            <span class="time-count">
              {{ time/10 }} s
            </span>
          </span>
          <div class="title" v-html="question.title"></div>
          <div class="body" v-html="question.body"></div>
          <div class="buttons">
            <button @click="revealAnswer">
              Reveal
            </button>
          </div>
        </div>
        <div class="face" v-if="revealed && !grading">
          <div class="answer" v-for="(answer, i) in question.answers" :key="i" v-html="answer.body">
          </div>
          <div class="buttons">
            <button @click="grading=true">
              Grade
            </button>
            <button @click="revealed=false">
              Question
            </button>
          </div>
        </div>
        <div class="face" v-if="revealed && grading">
          <h2>Grade yourself!</h2>
          <p>Be fair, being honest will make you be able to track your progress better</p>
          <div class="grade">
            <button @click="questionAproved" class="correct">
              I was right
            </button>
            <button @click="questionFailed" class="false">
              I was wrong
            </button>
          </div>
          <a :href="questionLink" target="_blank">StackOverflow Question Link</a>
          <button class="star" @click="starred = !starred">
            <img src="@/assets/icons/star.svg" height="45px" v-if="starred"/>
            <img src="@/assets/icons/star-outline.svg" height="45px" v-else />
          </button>
        </div>
      </div>
      <div class="flashcard" v-else>
        <div class="loading" v-if="loading">
          <span class="loader">
          </span>
        </div>
        <div class="loading" v-else>
          <button @click="loadQuestion">
            Start!
          </button>
        </div>
      </div>
    </div>
    <vFooter/>
  </div>
</template>

<script>

import axios from 'axios'
//import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import vNavBar from '@/components/vNavBar.vue'
import vFooter from '@/components/vFooter.vue'

export default {
  name: 'DashBoard',
  components: {
    vNavBar,
    vFooter
  },
  data: () => ({
    tags: ['vue', 'node'],
    intitle: 'axios',
    question: {},
    categories: ["typescript", "ruby", "python", "javascript", "java", "cpp", "csharp"],
    loading: false,
    apiKey: "WeOCAEHOmmFSiPlkDdzm6w((",
    language: 'javascript',
    revealed: false,
    time: 0,
    grading: false,
    streak: 0,
    totalQuestions: 0,
    totalSolved: 0,
    totalTime: 0,
    theme: {
      primary: "#1BE0A1",
      secondary: "#30b389",
      accent: "#EA4335",
      error: "#FF6347",
      info: "#4C8BF5",
      warning: "#FB8C00",
      success: "#32CD32",
      background: "#FFFFFF",
      background_light: "#f0f0f0",
      text: "#333333",
      text_light: "#999",
    },
    user: [],
    starred: false,
  }),
  methods: {
    setCategory(category) {
      this.language = category.toLowerCase()
      this.question = {}
      this.starred = false
      this.grading = false
      this.revealed = false
      this.time = 0
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
    questionAproved() {
      this.streak += 1
      this.totalSolved += 1
      this.totalQuestions += 1

      if (this.streak > this.user.longestStreak) {
        this.user.longestStreak = this.streak
      }
      this.user.performance.filter(a => a.tag == "Total").at(0).solved += 1
      this.user.performance.filter(a => a.tag == "Total").at(0).attempts += 1

      if (this.user.performance.filter(a => a.tag == this.language).length == 0) {
        this.user.performance.push({
          tag: this.language,
          attempts: 1,
          solved: 1
        })
      }
      else {
        this.user.performance.filter(a => a.tag == this.language).at(0).solved += 1
        this.user.performance.filter(a => a.tag == this.language).at(0).attempts += 1
      }

      this.user.questions.push(this.question.id)

      if (this.starred) {
        this.user.starred.push(this.question)
      }

      localStorage.setItem("stackLitUser", JSON.stringify(this.user))
      this.loadQuestion()
    },
    questionFailed() {
      this.streak = 0
      this.totalQuestions += 1

      this.user.performance.filter(a => a.tag == "Total").at(0).attempts += 1

      if (this.user.performance.filter(a => a.tag == this.language).length == 0) {
        this.user.performance.push({
          tag: this.language,
          attempts: 1,
          solved: 1
        })
      }
      else {
        this.user.performance.filter(a => a.tag == this.language).at(0).attempts += 1
      }

      this.user.questions.push(this.question.id)

      if (this.starred) {
        this.user.starred.push(this.question)
      }

      localStorage.setItem("stackLitUser", JSON.stringify(this.user))
      this.loadQuestion()
    },
    revealAnswer() {
      this.revealed = true
      this.stopTimer()
      this.totalTime += this.time/10
    },
    async searchStackOverflow(tags, intitle) {
      const apiUrl = `https://api.stackexchange.com/2.1/search/`;

      const params = {
        order: 'asc',
        sort: 'activity',
        tagged: tags,
        intitle: intitle,
        site: 'stackoverflow',
        key: this.apiKey,
        filter: 'withbody'
      };

      try {
        const response = await axios.get(apiUrl, { params });

        if (response.data && response.data.items && response.data.items.length > 0) {
          const results = response.data.items.slice(0, 100);
          let questionsId = [];
          results.forEach((result) => {
            questionsId.push(result.question_id);
          });
          return questionsId;
        } 
        else {
          console.log('No results found.');
        }
      } 
      catch (error) {
        console.error('Error fetching questions data:', error.message);
      }
    },
    async getQuestionAndAnswer(questionId) {
      const customFilter = '!-MBrU_IzpJ5H-AG6Bbzy.X-BYQe(2v-.J';
      try {
        const questionResponse = await axios.get(`https://api.stackexchange.com/2.1/questions/${questionId}`, {
          params: {
            order: 'desc',
            sort: 'activity',
            site: 'stackoverflow',
            filter: customFilter,
            key: this.apiKey,
          },
        });
        if (questionResponse.data && questionResponse.data.items && questionResponse.data.items.length > 0) {
          const question = questionResponse.data.items[0];
          console.log(question)
          const result = {
            id: question.question_id,
            title: question.title,
            body: question.body,
            answers: [],
            tags: question.tags,
            link: question.link,
            isAnswered: question.is_answered,
          };

          const answersResponse = await axios.get(`https://api.stackexchange.com/2.1/questions/${questionId}/answers`, {
            params: {
              order: 'desc',
              sort: 'activity',
              site: 'stackoverflow',
              filter: customFilter,
              key: this.apiKey,
            },
          });

          if (answersResponse.data && answersResponse.data.items && answersResponse.data.items.length > 0) {
            answersResponse.data.items.forEach(answer => {
              const answerInfo = {
                id: answer.answer_id,
                body: answer.body,
              };
              result.answers.push(answerInfo);
            });
          }

          return result;
        } 
        else {
          console.log('Question not found.');
          return null;
        }
      } 
      catch (error) {
        console.error('Error fetching question data:', error.message);
        return null;
      }
    },
    async fetchQuestion() {
      let ids = await this.searchStackOverflow(this.language, " ")
      if (ids) {
        this.question = await this.getQuestionAndAnswer(ids.filter(id => !this.user.questions.includes(id)).at(0))
        this.loading = false
        this.startTimer()
      }
    },
    applySyntaxHighlighting() {
      Array.from(document.getElementsByTagName('code')).forEach((code) => {
        code.classList.add(this.language);
      });
      //hljs.highlightAll();
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.time += 1;
      }, 100);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    loadQuestion() {
      this.loading = true
      this.question = {}
      this.starred = false
      this.fetchQuestion()
      this.grading = false
      this.revealed = false
      this.time = 0
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('stackLitUser'))
  },
  computed: {
    streakColor() {
      if (this.streak > 5) {
        return this.theme.error
      }
      if (this.streak > 2) {
        return this.theme.warning
      }
      else {
        return this.theme.info
      }
    },
    questionLink() {
      const baseUrl = 'https://stackoverflow.com/questions/';
      const questionId = this.question.id;
      const questionLink = `${baseUrl}${questionId}`;
      return questionLink
    }
  },
}
</script>

<style scoped>
  #dashboard {
    height: 100vh;
    width: 100h;
    overflow-y: scroll;
    overflow-x: hidden;
    background: var(--background);
    color: var(--text);
  }
  #study {
    width: 100h;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
    width: 100h;
    flex-direction: column;
  }
  .flashcard {
    height: 100%;
    width: 80%;
    max-width: 800px;
    min-height: 400px;
    border-radius: 10px;
    border: 1px solid var(--primary);
    padding: 20px;
    overflow-y: scroll;
    color: var(--text);
    position: relative;
    padding-top: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-size: 24px;
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
  }


  .loading {
    height: 100%;
    width: 100%;
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
    border-top-color: #fff;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }

  .language {
    border: 1px solid red !important;
    background: white !important;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;  
    width: 300px;
  }

  .infobar {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 20px;
    width: 100%;
    justify-content: space-evenly;
    margin-bottom: 30px;
  }

  .timer {
    min-width: 100px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .time-count {
    color: var(--text);
    opacity: .7;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }

  .star {
    width: 50px;
    height: 50px;
    position: absolute;
    top: -10px;
    right: 20px;
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 100px;
    text-align: center;
    user-select: none;
  }
  button:hover {
    background: var(--primary);
  }
  button:active {
    filter: brightness(.95);
  }

  .correct, .false {
    width: 120px;
  }

  .correct {
    border-color: var(--success);
  }
  .correct:hover {
    background: var(--success);
  }
  .false {
    border-color: var(--error);
  }
  .false:hover {
    background: var(--error);
  }

  .infobar-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  svg {
    height: 30px;
  }

  .grade {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 50px;
    margin-bottom: 30px;
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
