<template>
  <div>
    <h1>TODO</h1>
  </div>
</template>
<script>
import { columns, rows } from '../directory.js'
export default {
  data() {
    return {
      columns: columns,
      rows: rows,
    };
  }
};
</script>