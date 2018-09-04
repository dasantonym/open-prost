<template lang="pug">
  q-page
    op-generic-edit(:fields="fields", resource="takeouts")
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
