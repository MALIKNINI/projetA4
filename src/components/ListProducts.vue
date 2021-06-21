<template>
  <div>
    <h2>HELLO {{ name }} from the other side</h2>
    <h2>{{ email }}, HOW ARE YOU?</h2>
    <div><button @click="logout">Se déconnécter</button></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
      return {
          name: '',
          email: '',
      }
  },
  created(){
      //utilisateur non autorisé
      if (localStorage.getItem('token') === null){
        this.$router.push('/login');
      }
  },
  mounted() {
      axios.get('http://localhost:5000/api/users/user', { headers: { token: localStorage.getItem('token') } })
      .then(res => {
          this.name = res.data.user.name;
          this.email = res.data.user.email;
      })
  },
  methods: {
      logout() {
          localStorage.clear();
          this.$router.push('/login');
      }
  }
}
</script>