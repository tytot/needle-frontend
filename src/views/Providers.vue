<template>
  <div>
    <add-provider class="mx-auto" @refresh="load"/>
    <delete-provider @refresh="load"/>
    <div class="d-flex justify-content-center mt-2 mb-4">
      <b-button variant="light" @click="navigate">Cache</b-button>
    </div>
      <b-alert v-model="showDanger" dismissible variant="danger" class="m-3">
        An error occurred while loading the table.
      </b-alert>
    <h2 class="mt-2 d-flex justify-content-center">Provider Table</h2>
    <b-input-group class="p-3">
      <b-form-input
        v-model="filter"
        debounce="500"
        type="search"
        id="filterInput"
        placeholder="Type to Search"
      ></b-form-input>
      <b-input-group-append>
        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-table class="p-3"
      striped
      bordered
      hover
      responsive
      id="table"
      :items="rows"
      :fields="fields"
      :primary-key="uuid"
      :busy="isBusy"
      :filter="filter"
      @filtered="onFiltered"
    />
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
      //componentKey: 0,
      fields: [
        {
          sortable: true,
          key: "facility"
        },
        {
          sortable: true,
          key: "last_name"
        },
        {
          sortable: true,
          key: "first_name"
        },
        {
          label: "Phone #",
          sortable: true,
          key: "phone"
        },
        {
          label: "Email",
          sortable: true,
          key: "email"
        },
        {
          label: "UUID",
          sortable: false,
          key: "uuid"
        }
      ],
      rows: [],
      isBusy: true,
      showDanger: false,
      filter: null,
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
    this.isBusy = false;
  },
  methods: {
    load() {
      this.isBusy = true;
      this.$http
      .get("http://localhost:3000/providers")
      .then(response => {
        this.rows = response.data;
        //this.componentKey += 1;
      })
      .catch(function() {
        this.showErrorAlert();
      });
      this.isBusy = false;
    },
    navigate() {
      window.open('http://localhost:3000/XML', '_blank');
    },
    showErrorAlert() {
      this.showDanger = true;
    },
    // onFiltered(filteredItems) {
    //   // Trigger pagination to update the number of buttons/pages due to filtering
    //   this.totalRows = filteredItems.length
    //   this.currentPage = 1
    // }
  }
};
</script>
<style>
    table.b-table {
      font-family: 'Courier New', Courier, monospace
    }
</style>