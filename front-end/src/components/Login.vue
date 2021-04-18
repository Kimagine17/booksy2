<template>
<div class="hero">
  <div class="heroBox">
    <div class = "login">
      <form class="pure-form">
        <div class="login-credentials">
          <h2>Login</h2>
          <input placeholder="username" v-model="usernameLogin">
          <input type="password" placeholder="password" v-model="passwordLogin">
        </div>
        <div class="login-credentials">
          <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
        </div>
      </form>
      <p v-if="errorLogin" class="error">{{errorLogin}}</p>
    </div>
    <div class = "register">
      <form class="pure-form">
        <div class="register-credentials">
          <h2>Register for an account</h2>
          <input placeholder="first name" v-model="firstName">
          <input placeholder="last name" v-model="lastName">
        </div>
        <div class="register-credentials">
          <input placeholder="username" v-model="username">
          <input type="password" placeholder="password" v-model="password">
          <div>
            <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Register</button>
          </div>
        </div>
      </form>
      <p v-if="error" class="error">{{error}}</p>
    </div>
  </div>  
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomePage',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
   methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users/', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.hero {
  padding: 120px;
  display: flex;
  justify-content: center;
}

.heroBox {
  text-align: center;
  /* margin-top: auto;
  margin-bottom: auto; */
  /* border: 4px solid black; */
}

.hero form {
  font-size: 14px;
}

.hero form legend {
  font-size: 20px;
}

input {
  margin-right: 10px;
}

.error {
  margin-top: 3%;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}

.login, .register {
  padding: 5%;
}

.login-credentials, .register-credentials {
    background-color:#cfe2fd;
    padding-top: 5%;
    padding-bottom: 5%;
}



</style>

