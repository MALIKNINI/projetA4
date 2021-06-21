<template>
  <div>
      <h2>Register</h2>
      <br>{{ error }}
      <div><input type="text" placeholder="Username" v-model="name"/></div><br/>
      <div><input type="text" placeholder="Email" v-model="email"/></div><br/>
      <div><input type="password" placeholder="password" v-model="password"/></div><br/>
      <div><button @click="register">Submit</button></div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
      return {
          name: '',
          email: '',
          password: '',

          error: '',
      }
  },
  methods: {
      register() {
          let newUser = {
              name: this.name,
              email: this.email,
              password: this.password
          }
          axios.post('http://localhost:5000/api/users/register', newUser)
          .then(res => {
              console.log(res)
              this.$router.push('/login');
          }, err => {
              console.log(err.response)
              this.error = err.response.data.error
          })
      }
  }
}
</script>
