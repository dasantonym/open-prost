<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-layout-header
      q-toolbar(color="dark")

        q-toolbar-title OpenProst Admin

        q-btn(dark, flat, @click="$router.push({ name: 'items.list' })") Items
        q-btn(dark, flat, @click="$router.push({ name: 'locations.list' })") Locations
        q-btn(dark, flat, @click="$router.push({ name: 'persons.list' })") Persons
        q-btn(dark, flat, @click="$router.push({ name: 'settings.edit' })") Settings
        q-btn(dark, flat, icon="close", @click="$router.push({ name: 'site.welcome' })")

    q-page-container.q-pt-lg
      router-view
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>
