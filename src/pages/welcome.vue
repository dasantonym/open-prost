<template lang="pug">
  q-page.flex.flex-center
    div.q-ma-lg
      q-input.q-mb-md(float-label="Dein Name", type="text", v-model="name")
        q-autocomplete(:static-data="staticData", @selected="selected", value-field="label")
      q-btn(@click="start", :disabled="!name", color="primary") Start
    img.q-ma-lg(alt="Like a sir", src="~assets/sir.gif", style="max-width: 30%")
</template>

<script>
  export default {
    data () {
      return {
        persons: [],
        name: undefined,
        person: undefined
      }
    },
    async mounted () {
      this.persons = await this.$store.dispatch('persons/find', {})
    },
    computed: {
      staticData () {
        return {
          field: 'label',
          list: this.persons.map(person => {
            return {
              label: person.name,
              value: person.uuid
            }
          })
        }
      }
    },
    methods: {
      async start () {
        if (!this.person) {
          this.person = await this.$store.dispatch('persons/insert', { name: this.name })
          this.$q.notify('Person hinzugefügt')
        }
        this.$router.push({ name: 'takeouts.create', params: { person_uuid: this.person.uuid } })
      },
      selected (person) {
        this.person = person
      }
    }
  }
</script>
