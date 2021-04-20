<template>
<div class="hero">
  <div class="heroBox">
    <div class = "login">
      <form class="pure-form">
        <div class="login-credentials">
          <h1>Login</h1>
          <input class="form" placeholder="username" v-model="usernameLogin">
          <input class="form" type="password" placeholder="password" v-model="passwordLogin">
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
          <h1>Register for an account</h1>
        </div>
        <div class="register-credentials">
          <div>  
            <input class="form" placeholder="first name" v-model="firstName">
            <input class="form" placeholder="last name" v-model="lastName">
          </div>
          <div>  
            <input class="form" placeholder="username" v-model="username">
            <input class="form" type="password" placeholder="password" v-model="password">
          </div>
        </div>
        <div class="register-credentials">
          <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Register</button>
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
  padding: 2%;
  display: flex;
  justify-content: center;
  background-color:#f8f9fc;
}

.heroBox {
  text-align: center;
  width: 60%;
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
  margin-top: 3%;
  display: block;
}

.form {
  padding: 2%;
  font-size: 1.2em;
  margin-top: 4%;
}

.pure-form {
  background-color:#cfe2fd;
  padding-top: 3%;
  padding-bottom: 3%;
}

.pure-button {
  padding: 1% 3% 1% 3%;
  background-color: #062d62;
  color: antiquewhite;
  font-size: 1.2em;
}



</style>

