<template lang="pug">
  q-page
    op-generic-edit(:fields="fields", resource="locations")
</template>

<script>
  export default {
    data () {
      return {
        fields: [
          { name: 'Name', prop: 'name', type: 'text' }
        ]
      }
    }
  }
</script>
