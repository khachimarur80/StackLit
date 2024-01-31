<template>
  <div id="signup">
    <div class="signup-form-container">
      <div class="signup-form-header">
        <img src="@/assets/logo.png" height="60px"/>
        <h1>
          Sign Up
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
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required aria-describedby="email-error" placeholder="Enter your email address" v-model="formData.email" @focusout="validateField('email')" @keyup="validateField('email')">
        <div id="email-error" class="error-message" aria-live="polite">{{ errors.email }}</div>

        <label for="username">Username</label>
        <input type="text" id="username" name="username" required aria-describedby="username-error" placeholder="Enter your username" v-model="formData.username" @focusout="validateField('username')" @keyup="validateField('username')">
        <div id="username-error" class="error-message" aria-live="polite">{{ errors.username }}</div>

        <label for="password">Password</label>
        <div class="input-row">
          <input :type="showPassword ? 'text' : 'password'" id="password" name="password" required aria-describedby="password-error" placeholder="Enter your password" v-model="formData.password" @focusout="validateField('password')" @keyup="validateField('password')">
          <button :class="showPassword ? 'eye' : 'eye-hidden'" type="button" @click="showPassword = !showPassword" tabindex="-1">
          </button>
        </div>

        <div id="password-error" class="error-message" aria-live="polite">{{ errors.password }}</div>

        <label for="confirmPassword">Confirm password</label>
        <div class="input-row">
          <input :type="showConfirm ? 'text' : 'password'" id="confirmPassword" name="confirmPassword" required aria-describedby="confirmPassword-error" placeholder="Confirm your password" v-model="formData.confirmPassword" @focusout="validateField('confirmPassword')" @keyup="validateField('confirmPassword')">
          <button :class="showConfirm ? 'eye' : 'eye-hidden'" type="button" @click="showConfirm = !showConfirm" tabindex="-1">
          </button>
        </div>
        <div id="confirmPassword-error" class="error-message" aria-live="polite">{{ errors.confirmPassword }}</div>

        <button :class="['signup-btn', validForm ? '' : 'disabled']" type="submit" tabindex="-1" :disabled="!validForm">
          Sign Up
        </button>
      </form>
      <br>
      <div class="text-row">
        <span>
          Already have an account?
        </span>
        <a href="/login">
          Login
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data: () => ({
    showPassword: false,
    showConfirm: false,
    validForm: false,
    formData: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    errors: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  }),
  methods: {
    validateField(field) {
      let fields = ['email', 'username', 'password', 'confirmPassword']

      switch (fields.indexOf(field)) {
        case 0:
          if (!this.formData.email.trim()) {
            this.errors.email = 'Email is required!';
          } 
          else if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
            this.errors.email = 'Invalid email address!';
          } 
          else {
            this.errors.email = '';
          }
          break;
        case 1:
          if (!this.formData.username.trim()) {
            this.errors.username = 'Username is required!';
          } 
          else if (this.formData.username.trim().length < 3) {
            this.errors.username = 'Username is too short!';
          } 
          else {
            this.errors.username = '';
          }
          break;
        case 2:
          if (!this.formData.password.trim()) {
            this.errors.password = 'Password is required!';
          } 
          else if (this.formData.password.trim().length < 8) {
            this.errors.password = 'Password should be 8 characters at least!';
          } 
          else if (!/[a-zA-Z]/.test(this.formData.password)) {
            this.errors.password = 'Password should contain letters!';
          } 
          else if (!/\d/.test(this.formData.password)) {
            this.errors.password = 'Password should contain numbers!';
          } 
          else if (!/[A-Z]/.test(this.formData.password)) {
            this.errors.password = 'Password should contain uppercase letters!';
          } 
          else {
            this.errors.password = '';
          }
          break;
        case 3:
          if (this.formData.password !== this.formData.confirmPassword) {
            this.errors.confirmPassword = 'Passwords do not match!';
          } 
          else {
            this.errors.confirmPassword = '';
          }
          break;
      }

      this.validForm = Object.values(this.errors).every((error) => !error) && this.formData.confirmPassword!=='';
    },

    submit(event) {
      event.preventDefault()
      if (this.validForm) {
        window.location.href = window.location.protocol + "//" + window.location.host + '/dashboard'
        localStorage.setItem('authenticated', 'true')
      }
    },
  },
};
</script>
<style scoped>
  #signup {
    height: fit-content;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .signup-form-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .signup-form-header {
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
    background: white;
    padding: 10px 20px 10px 20px;
    border-radius: 8px;
    margin: 5px;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    transition: background .15s ease-in-out;
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

  .signup-btn {
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
  .signup-btn:not(.disabled):hover {
    background: var(--primary);
  }
  .signup-btn:not(.disabled):active {
    filter: brightness(.95);
  }

  .disabled {
    pointer-events: ;
    filter: saturate(0%);
    color: var(--primary);
    cursor: not-allowed;
  }
  .error-message {
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