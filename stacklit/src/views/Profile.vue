<template>
  <div id="profile">
    <vNavBar/>
    <div class="contents">
      <h2>Stats</h2>
      <hr>
      <div class="row">
        <svg style="margin-left: -3px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path fill="var(--error)" d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" /></svg>
        Longest Streak: {{ user.longestStreak }}
      </div>
      <div class="row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="var(--info)" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" /></svg>
        Total Time: {{ user.totalTime }}
      </div>
      <div class="row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="var(--warning)" d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z" /></svg>
        Joined: {{ user.joined }}
      </div>
      <div class="row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="var(--success)" d="M3,22V8H7V22H3M10,22V2H14V22H10M17,22V14H21V22H17Z" /></svg>
        Performance
      </div>
      <table>
        <thead>
          <tr>
            <th>
              Language
            </th>
            <th>
              Attempts
            </th>
            <th>
              Solved
            </th>
          </tr>
        </thead>
        <tr v-for="(tag, i) in user.performance" :key="i">
          <td>
            {{ tag.tag }}
          </td>
          <td>
            {{ tag.attempts }}
          </td>
          <td>
            {{ tag.solved }}
          </td>
        </tr>
      </table>
      <h2>Account Information</h2>
      <hr>
      <div class="section">
        <div class="left">
          <div class="row">
            Username: <input/>
          </div>
          <div class="row">
            Email:  <input/>
          </div>
        </div>
        <div class="right">
          <div class="row">
            <div class="profile">
              <img src="@/assets/icons/camera-plus-outline.svg" height="40px"/>
            </div>
          </div>
        </div>
      </div>
      <h2>Settings</h2>
      <hr>
      <div class="row">
        <strong>Dark/Light Theme</strong><br>
      </div>
      <div class="row">
        <label class="switch">
          <input type="checkbox" @input="changeTheme" v-model="dark">
          <span class="slider"></span>
        </label>
      </div>
      <div class="row">
      </div>
      <div class="row">
        <strong>Change Password</strong><br>
      </div>
      <div class="row">
        <span style="width: 150px">Old Password: </span><input type="password"/>
      </div>
      <div class="row">
        <span style="width: 150px">New Password: </span><input type="password"/>
      </div>
      <div class="row">
        <span style="width: 150px">Confirm Password: </span><input type="password"/>
      </div>
      <h2>Danger Zone</h2>
      <hr>
      <div class="row">
        <button class="danger">Delete Account</button>
      </div>
      <div class="row">
        <button class="danger">Logout</button>
      </div>
      <div class="row">
        <button class="danger">Reset Account</button>
      </div>
    </div>
    <br><br><br>
    <vFooter/>
  </div>
</template>

<script>
import vNavBar from '@/components/vNavBar.vue'
import vFooter from '@/components/vFooter.vue'

export default {
  name: 'vProfile',
  components: {
    vNavBar,
    vFooter
  },
  data: () => ({
    user: {},
    dark: false,
  }),
  mounted() {
    if (localStorage.getItem('dark')) {
      this.dark = localStorage.getItem('dark') == 'true'
    }

    this.user = JSON.parse(localStorage.getItem('stackLitUser'))
  },
  methods: {
    changeTheme() {
      console.log(!this.dark)
      if (!this.dark) {
        localStorage.setItem('dark', 'true')
      }
      else {
        localStorage.setItem('dark', 'false')
      }

      window.location.reload()
    }
  }
}
</script>

<style scoped>
  hr {
    border-bottom: none;
    margin-top: -10px;
    margin-bottom: 25px;
  }
  h2 {
    margin-top: 60px;
  }
  #profile {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    background-color: var(--background);
    color: var(--text);
  }
  .contents {
    width: 80%;
    margin-left: 10%;
  }

  table {
    width: 600px;
    border-collapse: collapse;
    background-color: var(--text-light);
    border: 1px solid var(--primary);
    margin-left: 55px;
  }

  th, td {
    padding: 10px;
    text-align: center;
    user-select: none;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--primary);
  }

  th {
    background-color: var(--primary);
  }

  tr:nth-child(even) {
    background-color: var(--background);
  }
  tr:nth-child(odd) {
    background-color: var(--background-light);
  }

  svg {
    height: 30px;
  }
  .row {
    margin: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .profile {
    border: 1px solid var(--text-light);
    height: 200px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--background);
  }
  .profile:hover {
    filter: brightness(.9);
    cursor: pointer;
  }
  .left {
    margin-right: 50px;
  }
  .left .row {
    display: flex;
    justify-content: space-between;
    gap: 50px;
  }
  input {
    border: 1px solid var(--text-light);
    padding: 7px 10px 7px 10px;
    outline: none;
    border-radius: 5px;
  }

  .danger {
    width: 140px;
    border-radius: 10px;
    border: 1px solid var(--error);
    color: var(--error);
    padding: 8px 10px 8px 10px;
    background: transparent;
    transition: background .3s ease-out;
  }
  .danger:hover {
    cursor: pointer;
    background: var(--error);
    color: var(--background);
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-left: 15px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 26px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: var(--secondary);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--secondary);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
</style>
