<template>
  <div>
    <b-container>
      <b-card class="mt-2" title="Login" bg-variant="light">
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          The username and password do not match.
        </b-alert>
        <b-form @submit="handleSubmit">
          <label for="username">Username:</label>
          <b-form-input class="mb-3"
            id="username"
            v-model="name"
            required
          ></b-form-input>
          <label for="pwd">Password:</label>
          <b-form-input class="mb-3"
            id="pwd"
            v-model="password"
            type="password"
            required
          ></b-form-input>
          <b-row class="d-flex justify-content-center">
            <b-button type="submit" variant="success">Login</b-button>
          </b-row>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      password: "",
      showDismissibleAlert: false,
    };
  },
  methods: {
    handleSubmit(e) {
      this.showDismissibleAlert=true;
      e.preventDefault();
      if (this.password.length > 0) {
        this.$http
          .post("http://localhost:3000/login", {
            name: this.name,
            password: this.password
          })
          .then(response => {
            let is_admin = response.data.user.is_admin;
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                if (is_admin == 1) {
                  this.$router.push("admin");
                } else {
                  this.$router.push("dashboard");
                }
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
  },
};
</script>
