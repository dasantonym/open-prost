<template lang="pug">
  q-page.flex.flex-center
    div.q-ma-lg
      q-input.q-mb-md(float-label="Passwort", type="password", v-model="password")
      q-btn(@click="submit", :disabled="!password", color="primary") Login
    img.q-ma-lg(alt="Challenge accepted", src="~assets/challenge.png", style="max-width: 30%")
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
        this.$router.push({ name: 'items.list' })
      }
    }
  }
</script>
