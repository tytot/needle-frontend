<template>
  <div>
    <nav v-if="isGuest()">
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
    <nav v-else-if="isAdmin()">
      <router-link to="/admin">Dashboard</router-link> |
      <router-link to="/logout">Logout</router-link>
    </nav>
    <nav v-else>
      <router-link to="/userboard">Dashboard</router-link> |
      <router-link to="/logout">Logout</router-link>
    </nav>
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
    }
  }
}
</script>