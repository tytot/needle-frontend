<template>
  <div id="table">
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{
            enabled: true
        }"
    />
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
        }
      ],
      rows: [
        {
          id: 1,
          facility: "EC",
          first_name: "Aditya",
          last_name: "Balasubramanian",
          phone: "+4204206969"
        },
        {
          id: 2,
          facility: "EC",
          first_name: "Keshav",
          last_name: "Ganapathy",
          phone: "+6969696969"
        },
      ]
    };
  }
};
</script>