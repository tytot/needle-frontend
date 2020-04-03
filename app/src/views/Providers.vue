<template>
  <div>
    <add-provider @refresh="load"/>
    <delete-provider @refresh="load"/>
    <vue-good-table
      id="table"
      :key="componentKey"
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
import addProvider from '../components/AddProvider'
import deleteProvider from '../components/DeleteProvider'
export default {
  components: {
    'add-provider': addProvider,
    'delete-provider': deleteProvider
  },
  data() {
    return {
      componentKey: 0,
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
        }
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
  },
  methods: {
    load() {
      this.$http
      .get("http://localhost:3000/providers")
      .then(response => {
        this.rows = response.data;
        this.componentKey += 1;
      })
      .catch(function(error) {
        console.error(error.response);
      });
    }
  }
};
</script>