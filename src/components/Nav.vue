<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="info">
      <b-container>
          <b-navbar-brand href="#">N.E.S. 1.0</b-navbar-brand>
          <b-navbar-toggle v-if="!isGuest()" target="nav-collapse"></b-navbar-toggle>
          <b-collapse v-if="!isGuest()" id="nav-collapse" is-nav>
            <b-navbar-nav v-if="isAdmin()">
              <b-nav-item to="/admin">Dashboard</b-nav-item>
              <b-nav-item to="/providers">Providers</b-nav-item>
              <b-nav-item to="/register">Register User</b-nav-item>
              <b-nav-item to="/logout">Logout</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav v-else>
              <b-nav-item to="/dashboard">Dashboard</b-nav-item>
              <b-nav-item to="/logout">Logout</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() { return {} },
  methods: {
    isGuest() {
      return localStorage.getItem('jwt') == null;
    },
    isAdmin() {
      return JSON.parse(localStorage.getItem('user')).is_admin == 1;
    },
  }
}
</script>