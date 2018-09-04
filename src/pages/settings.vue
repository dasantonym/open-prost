<template lang="pug">
  q-page
    .q-ma-lg
      .row
        h3.q-mb-md.caption Settings
      .col-md-6.q-mb-md
        q-input.full-width(float-label="Change password", type="password", v-model="password")
      .row.q-pt-lg
        q-btn(@click="submit", color="primary") Save
</template>

<script>
  export default {
    data () {
      return {
        password: undefined
      }
    },
    methods: {
      submit () {
        console.debug(this.password)
      }
    }
  }
</script>
