<template>
  <div id="login">
    <div class="login-form-container">
      <div class="login-form-header">
        <img src="@/assets/logo.png" height="60px" class="noinvert"/>
        <h1>
          Login
        </h1>
      </div>
      <button class="continue-with" tabindex="-1">
        <img src="@/assets/icons/google.svg" height="28px">
        Continue with Google
      </button>
      <button class="continue-with" tabindex="-1">
        <img src="@/assets/icons/apple.svg" height="28px">
        Continue with Apple
      </button>
      <span class="or-email">
        or email
      </span>
      <form class="form" @submit="submit">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required aria-describedby="username-error" placeholder="Enter your username" v-model="formData.username">

        <label for="password">Password</label>
        <div class="input-row">
          <input :type="showPassword ? 'text' : 'password'" id="password" name="password" required aria-describedby="password-error" placeholder="Enter your password" v-model="formData.password">
          <button :class="showPassword ? 'eye' : 'eye-hidden'" type="button" @click="showPassword = !showPassword" tabindex="-1">
          </button>
        </div>

        <button :class="['login-btn', formData.username.length>0 && formData.password.length>0 ? '' : 'disabled']" type="submit" tabindex="-1" :disabled="!validForm">
          Login
        </button>
      </form>
      <br>
      <div class="text-row">
        <span>
          New to StackLit?
        </span>
        <a href="/signup" tabindex="-1">
          Create an account
        </a>
      </div>
      <div class="text-row">
        <a>
          Forgot password?
        </a>
      </div>


    </div>
  </div>
</template>

<script>

class User {
  constructor(username) {
    this.username = username
    this.joined = new Date().toLocaleDateString('en-GB')
    this.performance = [
      { 
        tag: "Total",
        attempts: 0,
        solved: 0
      }
    ]
    this.longestStreak = 0
    this.totalTime = 0
    this.questions = []
    this.starred = []
  }
}

export default {
  name: 'vLogin',
  data: () => ({
    showPassword: false,
    formData: {
      username: '',
      password: '',
    },
  }),
  methods: {
    submit(event) {
      event.preventDefault()
      window.location.href = window.location.protocol + "//" + window.location.host + '/dashboard'
      localStorage.setItem('authenticated', 'true')
      localStorage.setItem('stackLitUser', JSON.stringify(new User(this.formData.username)))
    },
  },
  computed: {
    validForm() {
      return this.formData.username.length>0 && this.formData.password.length>0
    }
  }
};
</script>
<style scoped>
  #login {
    height: fit-content;
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    background: var(--background);
  }
  #login > * {
    overflow-x: hidden;
  }
  .login-form-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .login-form-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    margin-top: 5px;
    color: var(--text);
    font-size: 24px;
  }
  .continue-with {
    width: 300px;
    border: 1px solid var(--secondary);
    background: var(--background);
    padding: 10px 20px 10px 20px;
    border-radius: 8px;
    margin: 5px;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    transition: background .15s ease-in-out;
    color: var(--text);
  }
  .continue-with:hover {
    background: var(--background-dark);
    cursor: pointer;
  }
  .or-email {
    margin: 10px;
    opacity: .7;
    color: var(--text);
    font-size: 14px;
    position: relative;
  }
  .or-email::before {
    content: '';
    height: 1px;
    width: 90px;
    background: var(--text);
    opacity: .9;
    position: absolute;
    right: calc(-100% - 50px);
    top: 8px;
  }
  .or-email::after {
    content: '';
    height: 1px;
    width: 90px;
    background: var(--text);
    opacity: .9;
    position: absolute;
    left: calc(-100% - 50px);
    top: 8px;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: calc(100% - 20px);
  }
  label {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 20px;
    color: var(--text);
  }
  input {
    font-size: 14px;
    width: calc(100% - 20px);
    padding: 8px 10px 8px 10px;
    border-radius: 5px;
    border: 1px solid var(--background-dark);
    outline: none;
  }

  .login-btn {
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
    width: 100%;
    text-align: center;
    user-select: none;
  }
  .login-btn:not(.disabled):hover {
    background: var(--primary);
  }
  .login-btn:not(.disabled):active {
    filter: brightness(.95);
  }

  .disabled {
    pointer-events: ;
    filter: saturate(0%);
    color: var(--primary);
    cursor: not-allowed;
  }
  .eror-message {
    color: var(--error);
    font-size: 12px;
    padding: 5px;
  }
  .eye, .eye-hidden {
    height: 20px;
    width: 20px;
    background: black;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
    border: none;
    cursor: pointer;
    outline: none;
  }
  #password, #confirmPassword {
    width: calc(100% - 40px);
    padding-right: 30px;
  }
  .eye-hidden {
    background: url('@/assets/icons/eye-off-outline.svg');
  }
  .eye {
    background: url('@/assets/icons/eye-outline.svg');
  }

  .input-row {
    font-size: 14px;
    width: 100%;
    outline: none;
    position: relative;
  }

  .text-row {
    font-size: 13px;
    margin: 2px;
  }
  .text-row span {
    color: var(--text);
    opacity: .7;
  }
  .text-row a {
    text-decoration: none;
    color: var(--secondary);
    filter: saturation(120%);
    cursor: pointer;
  }
</style>