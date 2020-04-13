<template>
  <div class="px-4">
      <b-card
          title="Data"
          bg-variant="light">
          <column-chart :data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]"></column-chart>
      </b-card>
  </div>
</template>

<script>
export default {
    data() {
        return {};
    }
}
</script>