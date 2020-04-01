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
import { columns, rows } from '../components/Directory.js'
export default {
  data() {
    return {
      columns: columns,
      rows: rows,
    };
  }
};
</script>