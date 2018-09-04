<template lang="pug">
  q-page.flex.flex-center
    div.q-ma-lg
      q-input.q-mb-md(float-label="Passwort", type="password", v-model="password")
      q-btn(@click="submit", :disabled="!password", color="primary") Login
    img.q-ma-lg(alt="Challenge accepted", src="~assets/challenge.png", style="max-width: 30%")
</template>

<script>
  import getToken from '../lib/get-token'
  export default {
    data () {
      return {
        password: undefined
      }
    },
    methods: {
      async submit () {
        this.$q.loading.show()
        const token = await getToken(this.password)
        this.$q.loading.hide()
        if (!this.$store.state.settings.access_token && token !== this.$store.state.settings.access_token) {
          this.$router.push({ name: 'items.list' })
        }
        else {
          this.$q.notify('No')
        }
      }
    }
  }
</script>
