<template>
  <div id="table">
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{
            enabled: true
        }"
    />
    <div>
      <button @click="$router.push({name: 'XML'})">Cache</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          label: "Facility",
          field: "facility"
        },
        {
          label: "Last Name",
          field: "last_name"
        },
        {
          label: "First Name",
          field: "first_name"
        },
        {
          label: "Phone #",
          field: "phone"
        },
        {
          label: "Email",
          field: "email"
        },
        {
          label: "UUID",
          field: "uuid"
        },
      ],
      rows: []
    };
  },
  created() {
    this.$http
      .get("http://localhost:3000/providers")
      .then(response => {
        this.rows = response.data;
      })
      .catch(function(error) {
        console.error(error.response);
      });
  }
};
</script>