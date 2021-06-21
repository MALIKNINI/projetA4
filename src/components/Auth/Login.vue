<template>
  <v-app>
    <v-content>
      <v-container>
          <v-row>
             <v-col cols="12" sm="8" md="8">
                <v-card class="elevation-12">
                    <v-window>
                        <div>
                            <h2>Login</h2>
                            <br />{{ error }}
                            <div><input type="text" placeholder="Email" v-model="email" /></div>
                            <br />
                            <div><input type="password" placeholder="password" v-model="password" /></div>
                            <br />
                            <div><button @click="login">Login</button></div>
                        </div>
                    </v-window>
                </v-card>
             </v-col>
          </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",

      error: "",
    };
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      axios.post("http://localhost:5000/api/users/login", user).then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          }
        },
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
        }
      );
    },
  },
};
</script>
