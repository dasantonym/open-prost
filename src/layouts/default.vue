<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-layout-header
      q-toolbar(color="dark")

        q-toolbar-title OpenProst

        q-btn(dark, flat, icon="settings", @click="$router.push({ name: 'site.login' })")

    q-page-container.q-pa-lg
      router-view
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>
