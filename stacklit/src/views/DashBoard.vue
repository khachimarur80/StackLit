<template>
  <div id="dashboard">
    <vNavBar/>
    <div id="study">
      <div class="flashcard" v-if="loading">
        <div class="loading">
          <span class="loader">
          </span>
        </div>
      </div>
      <div class="flashcard" v-else>
        <div class="title" v-html="question.title"></div>
        <div class="body" v-html="question.body"></div>
        <hr>
        <div class="answer" v-for="(answer, i) in question.answers" :key="i" v-html="answer.body">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import vNavBar from '@/components/vNavBar.vue'

export default {
  name: 'DashBoard',
  components: {
    vNavBar,
  },
  data: () => ({
    tags: ['vue', 'node'],
    intitle: 'axios',
    question: {},
    loading: true,
  }),
  methods: {
    async searchStackOverflow(tags, intitle) {
      const apiUrl = 'https://api.stackexchange.com/2.3/search';

      const params = {
        order: 'desc',
        sort: 'activity',
        tagged: tags,
        intitle: intitle,
        site: 'stackoverflow',
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
        const queryString = new URLSearchParams(params).toString();
        const requestUrl = `${apiUrl}?${queryString}`;
        console.log(requestUrl)
        console.error('Error fetching data:', error.message);
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
          },
        });

        if (questionResponse.data && questionResponse.data.items && questionResponse.data.items.length > 0) {
          const question = questionResponse.data.items[0];

          const result = {
            id: question.question_id,
            title: question.title,
            body: question.body,
            answers: [],
          };

          const answersResponse = await axios.get(`https://api.stackexchange.com/2.1/questions/${questionId}/answers`, {
            params: {
              order: 'desc',
              sort: 'activity',
              site: 'stackoverflow',
              filter: customFilter,
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
      } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
      }
    },
    async fetchQuestion() {
      let ids = await this.searchStackOverflow(this.tags, this.intitle)
      if (ids) {
        this.question = await this.getQuestionAndAnswer(ids.at(0))
        this.loading = false
      }
    },
    applySyntaxHighlighting() {
      Array.from(document.getElementsByTagName('code')).forEach((code) => {
        console.log(code)
        code.classList.add('language-javascript');
      });
      Prism.highlightAll();
    },
  },
  mounted() {
    this.fetchQuestion()
  },
  updated() {
    this.$nextTick(() => {
      this.applySyntaxHighlighting();
    });
  },
}
</script>

<style scoped>
  #dashboard {
    height: 100vh;
    width: 100h;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  #study {
    width: 100h;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 80px - 160px);
    padding: 80px;
    width: 100h;
  }
  .flashcard {
    height: 100%;
    min-width: 100%;
    border-radius: 10px;
    border: 1px solid var(--primary);
    padding: 20px;
    overflow-y: scroll;
    color: var(--text);
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

  pre[class*="language-"] {
    border: 1px solid red !important;
    width: 100%;
    background: white !important;
  }
</style>
