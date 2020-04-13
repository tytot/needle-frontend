<template>
  <div>
    <b-container>
      <b-card class="mt-2" title="Register" bg-variant="light">
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          An user already exists with that username or email.
        </b-alert>
        <b-form @submit="handleSubmit">
          <label for="username">Username:</label>
          <b-form-input class="mb-3"
            id="username"
            v-model="name"
            required
          ></b-form-input>
          <label for="email">Email:</label>
          <b-form-input class="mb-3"
            id="email"
            v-model="email"
            type="email"
          ></b-form-input>
          <label for="pwd">Password:</label>
          <b-form-input class="mb-3"
            id="pwd"
            v-model="password"
            type="password"
            required
          ></b-form-input>
          <label for="c-pwd">Confirm Password:</label>
          <b-form-input
            id="c-pwd"
            v-model="password_confirmation"
            type="password"
            :state="validation"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validation">
            Passwords do not match.
          </b-form-invalid-feedback>
          <label for="admin" class="mt-3">Administrator</label>
          <b-form-checkbox class="mb-3"
            id="admin"
            v-model="is_admin"
            value="true"
            unchecked-value="false"
            required
          ></b-form-checkbox>
          <b-row class="d-flex justify-content-center">
            <b-button type="submit" variant="success">Register User</b-button>
          </b-row>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>
<script>
export default {
  props: ["nextUrl"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin: null,
      showDismissibleAlert: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.showDismissibleAlert = true;

      let url = "http://localhost:3000/register";
      if (this.is_admin != null || this.is_admin == 1)
        url = "http://localhost:3000/register-admin";
      this.$http
        .post(url, {
          name: this.name,
          email: this.email,
          password: this.password,
          is_admin: this.is_admin
        })
        .then(response => {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("jwt", response.data.token);

          if (localStorage.getItem("jwt") != null) {
            this.$emit("loggedIn");
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push("/");
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    validation() {
      return this.password === this.password_confirmation && this.password.length > 0;
    }
  }
};
</script>