<template>
  <v-app>
    <Navbar/>
    <v-content>
      <v-container>
        <div>
          <h2>HELLO {{ name }} PORTANT L'ID: "{{ idd }}"</h2>
          <h2>{{ email }}</h2>
          <div><button @click="logout">Se déconnécter</button></div>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import Navbar from '@/components/compos/Navbar.vue'

export default {
  name: "Home",
  components: {Navbar},
  data() {
    return {
      name: "",
      email: "",
      idd: "",
    };
  },
  created() {
    //utilisateur non autorisé
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    axios
      .get("http://localhost:5000/api/users/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.name = res.data.user.name;
        this.email = res.data.user.email;
        this.idd = res.data.user.idd;
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.$store.commit("setAuthentication", true);
    },
  },
};
</script>

