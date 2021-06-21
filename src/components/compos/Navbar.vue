<template>
    <v-app-bar
      app
      dark
      id="nav"
    >
    <router-link :class="{ active: $route.name === 'Articls' }" to="/register">Register</router-link> | 
    <router-link :class="{ active: $route.name === 'Articls' }" to="/Login">Login</router-link>

      <v-spacer></v-spacer>

    </v-app-bar>
    
</template>

<script>
import axios from "axios";
export default {
    name: 'Navbar',
    data() {
      return {
        user: []
      }
    },
    mounted() {
    axios.get("http://localhost:5000/api/users/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.name = res.data.user.name;
        this.email = res.data.user.email;
        this.idd = res.data.user.idd;
      });
  }
}
</script>

<style lang="scss">
#nav {
  padding: 10px;
  width: 100%;
  height: 30px;
  background-color: white;
  line-height: 30px;

  a {
    font-weight: bold;
    color: darkgray;
    text-decoration: none;
    margin: 0 5px 0 5px;
    font-size: 1.25rem;

    &.active {
    color: #2c3e50;
  
    }
  }
}
</style>