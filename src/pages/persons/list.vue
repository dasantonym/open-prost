<template lang="pug">
  op-generic-list(:columns="columns", resource="persons")
</template>

<script>
  export default {
    data () {
      return {
        columns: [
          {
            name: 'name',
            required: true,
            label: 'Name',
            align: 'left',
            field: 'name',
            sortable: true
          }
        ]
      }
    }
  }
</script>
