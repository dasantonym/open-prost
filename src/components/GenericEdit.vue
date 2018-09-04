<template lang="pug">
  .q-ma-lg
    .row
      h3.q-mb-md.caption {{ title }}
    .col-md-6.q-mb-md(v-for="field in fields")
      q-input.full-width(:float-label="field.name", :type="field.type", v-model="item[field.prop]")
    .row.q-pt-lg
      q-btn(@click="submit", color="primary") Save
</template>

<script>
  export default {
    name: 'GenericEdit',
    props: {
      resource: String,
      fields: Array
    },
    data () {
      return {
        item: {}
      }
    },
    async mounted () {
      if (this.$route.params.uuid) this.item = await this.$store.dispatch(`${this.resource}/get`, this.$route.params.uuid)
    },
    computed: {
      title () {
        return `${this.$route.params.uuid ? 'Edit' : 'Create'} ${this.resource}`
      }
    },
    methods: {
      async submit () {
        this.$q.loading.show()
        try {
          if (this.item.uuid) await this.$store.dispatch(`${this.resource}/update`, [{uuid: this.item.uuid}, this.item])
          else await this.$store.dispatch(`${this.resource}/insert`, this.item)
          this.$q.notify('Save successful')
          this.$router.push({ name: `${this.resource}.list` })
        }
        catch (err) {
          this.$q.notify(err.message)
        }
        this.$q.loading.hide()
      }
    }
  }
</script>
